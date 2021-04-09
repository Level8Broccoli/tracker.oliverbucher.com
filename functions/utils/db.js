import {
    Client,
    Collection,
    Create,
    CreateCollection,
    CreateIndex,
    Exists,
    Index,
    Match,
    Paginate
} from 'faunadb';
import { ALL_TRACKER_NAMES_INDEX, CONFIGS_COLLECTION } from './config';

const db = new Client({
    secret: process.env.FAUNADB_SECRET
});

const createCollection = async (name) => {
    await db.query(CreateCollection({ name }));
};
const createIndex = async (name) => {
    await db.query(
        CreateIndex({
            name: ALL_TRACKER_NAMES_INDEX,
            unique: true,
            serialized: true,
            source: Collection(name),
            terms: [
                {
                    field: ['data', 'name']
                }
            ]
        })
    );
};

export const createConfigCollectionIfNotExists = async () => {
    const collectionExists = await db.query(Exists(Collection(CONFIGS_COLLECTION)));
    if (!collectionExists) {
        console.log(`Collection "${CONFIGS_COLLECTION}" does not yet exists. Creating...`);
        try {
            await createCollection(CONFIGS_COLLECTION);
            await createIndex(CONFIGS_COLLECTION);
            console.log(`Collection "${CONFIGS_COLLECTION}" created.`);
        } catch (e) {
            console.log(`Error while creating collection "${CONFIGS_COLLECTION}"!`, e);
            throw e;
        }
    }
};

export const checkIfTrackNameAlreadyExists = async (trackName) => {
    const { data } = await db.query(Paginate(Match(Index(ALL_TRACKER_NAMES_INDEX), trackName)));
    return data.length > 0;
};

export const createTrackConfig = async (name, secret) => {
    db.query(
        Create(Collection(CONFIGS_COLLECTION), {
            data: { name, secret }
        })
    );
};
