import { Client, Collection, CreateCollection, CreateIndex, Exists, Time } from 'faunadb';
import { ALL_TRACKERS_INDEX, ALL_TRACKER_NAMES_INDEX, CONFIGS_COLLECTION } from '../utils/config';

export const db = new Client({
    secret: process.env.FAUNADB_SECRET
});

export const createConfigCollectionIfNotExists = async () => {
    const collectionExists = await db.query(Exists(Collection(CONFIGS_COLLECTION)));
    if (collectionExists) {
        return `Collection "${CONFIGS_COLLECTION}" already exists.`;
    }

    const { ref: source } = await db.query(CreateCollection({ CONFIGS_COLLECTION }));

    await db.query(
        CreateIndex({
            name: ALL_TRACKER_NAMES_INDEX,
            unique: true,
            serialized: true,
            source,
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
            source,
            terms: [
                {
                    field: ['data', 'name']
                }
            ]
        })
    );
    return {
        msg: `Collection "${CONFIGS_COLLECTION}" created.`
    };
};
