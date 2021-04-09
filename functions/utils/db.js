import { COLLECTION_NAME_CONFIG } from './config';
import { Client, Collection, CreateCollection, Exists } from 'faunadb';

const db = new Client({
    secret: process.env.FAUNADB_SECRET
});

const createCollection = async (name) => {
    await db.query(CreateCollection({ name }));
};

export const createConfigCollectionIfNotExists = async () => {
    const collectionExists = await db.query(Exists(Collection(COLLECTION_NAME_CONFIG)));
    if (!collectionExists) {
        console.log(`Collection "${COLLECTION_NAME_CONFIG}" does not yet exists. Creating...`);
        try {
            await createCollection(COLLECTION_NAME_CONFIG);
            console.log(`Collection "${COLLECTION_NAME_CONFIG}" created.`);
        } catch (e) {
            console.log(`Error while creating collection "${COLLECTION_NAME_CONFIG}"!`, e);
            throw e;
        }
    }
};

export const checkIfTrackNameAlreadyExists = async (trackName) => {
    return null;
};
