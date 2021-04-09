import {
    Client,
    Collection,
    Create,
    CreateCollection,
    CreateIndex,
    Delete,
    Exists,
    Get,
    Index,
    Match,
    Paginate
} from 'faunadb';
import { ALL_TRACKERS_INDEX, ALL_TRACKER_NAMES_INDEX, CONFIGS_COLLECTION } from './config';

const db = new Client({
    secret: process.env.FAUNADB_SECRET
});

const createCollection = async (name) => {
    await db.query(CreateCollection({ name }));
};

export const createConfigCollectionIfNotExists = async () => {
    const collectionExists = await db.query(Exists(Collection(CONFIGS_COLLECTION)));
    if (!collectionExists) {
        console.log(`Collection "${CONFIGS_COLLECTION}" does not yet exists. Creating...`);
        try {
            await createCollection(CONFIGS_COLLECTION);
            await db.query(
                CreateIndex({
                    name: ALL_TRACKER_NAMES_INDEX,
                    unique: true,
                    serialized: true,
                    source: Collection(CONFIGS_COLLECTION),
                    terms: [
                        {
                            field: ['data', 'name']
                        }
                    ]
                })
            );
            await db.query(
                CreateIndex({
                    name: ALL_TRACKERS_INDEX,
                    unique: false,
                    serialized: true,
                    source: Collection(CONFIGS_COLLECTION),
                    terms: [
                        {
                            field: ['data', 'name']
                        }
                    ]
                })
            );
            console.log(`Collection "${CONFIGS_COLLECTION}" created.`);
        } catch (e) {
            console.log(`Error while creating collection "${CONFIGS_COLLECTION}"!`, e);
            throw e;
        }
    }
};

export const checkIfTrackNameAlreadyExists = async (name) => {
    const { data } = await db.query(Paginate(Match(Index(ALL_TRACKER_NAMES_INDEX), name)));
    return data.length > 0;
};

export const createTrackConfig = async (name, secret) => {
    db.query(
        Create(Collection(CONFIGS_COLLECTION), {
            data: { name, secret }
        })
    );
};

export const createTrackCollection = async (name) => {
    await createCollection(name);
};

export const getConfigEntry = async (name) => {
    return await db.query(Get(Match(Index(ALL_TRACKERS_INDEX), name)));
};

export const deleteTrack = async (name) => {
    const docRef = await getConfigEntry(name);
    db.query(Delete(docRef.ref));
    db.query(Delete(Collection(name)));
};
