import {
    Client,
    Collection,
    Create,
    CreateCollection,
    CreateIndex,
    Time,
    Delete,
    Exists,
    Get,
    Index,
    Match,
    Paginate
} from 'faunadb';
import {
    ALL_TRACKERS_INDEX,
    ALL_TRACKER_NAMES_INDEX,
    CONFIGS_COLLECTION,
    ENTRY_TYPE
} from './config';

const db = new Client({
    secret: process.env.FAUNADB_SECRET
});

const createCollection = async (name) => {
    return await db.query(CreateCollection({ name }));
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

export const createTrackConfig = async (name, secret, ts) => {
    const timestamp = Time(ts.toISOString());
    return await db.query(
        Create(Collection(CONFIGS_COLLECTION), {
            data: { name, secret, timestamp }
        })
    );
};

const createStartEntry = async (collectionRef, ts) => {
    const timestamp = Time(ts.toISOString());
    return await db.query(Create(collectionRef, { data: { timestamp, type: ENTRY_TYPE.CREATED } }));
};

export const createTrackCollection = async (name, ts) => {
    const { ref } = await createCollection(name);
    return await createStartEntry(ref, ts);
};

export const getConfigEntry = async (name) => {
    return await db.query(Get(Match(Index(ALL_TRACKERS_INDEX), name)));
};

export const deleteTrack = async (name) => {
    const docRef = await getConfigEntry(name);
    await db.query(Delete(docRef.ref));
    await db.query(Delete(Collection(name)));
};
