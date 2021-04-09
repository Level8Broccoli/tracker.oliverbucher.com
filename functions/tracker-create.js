import { Client, Collection, CreateCollection, Exists } from 'faunadb';
import { getHeaders, returnError, validateTrackName } from './util/utils';
import { COLLECTION_NAME_CONFIG } from './util/config';

const db = new Client({
    secret: process.env.FAUNADB_SECRET
});

const createCollection = async (name) => {
    await db.query(CreateCollection({ name }));
};

export async function handler({ body }) {
    try {
        validateTrackName(JSON.parse(body));

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

        return {
            statusCode: 200,
            body: JSON.stringify({}),
            headers: getHeaders()
        };
    } catch (e) {
        return returnError(e);
    }
}
