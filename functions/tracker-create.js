import { Client, Collection, CreateCollection, Exists } from 'faunadb';
import { getHeaders, returnError } from './util/utils';

const db = new Client({
    secret: process.env.FAUNADB_SECRET
});

const COLLECTION_NAME_CONFIG = '.configs';

const createCollection = async (name) => {
    await db.query(CreateCollection({ name }));
};

export async function handler() {
    const collectionExists = await db.query(Exists(Collection(COLLECTION_NAME_CONFIG)));
    if (!collectionExists) {
        console.log(`Collection "${COLLECTION_NAME_CONFIG}" does not yet exists. Creating...`);
        try {
            await createCollection(COLLECTION_NAME_CONFIG);
            console.log(`Collection "${COLLECTION_NAME_CONFIG}" created.`);
        } catch (e) {
            console.log(`Error while creating collection "${COLLECTION_NAME_CONFIG}"!`, e);
            return returnError(e);
        }
    }

    return {
        statusCode: 200,
        body: JSON.stringify({}),
        headers: getHeaders()
    };
}
