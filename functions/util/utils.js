import { COLLECTION_NAME_CONFIG } from './config';
import { Client, Collection, CreateCollection, Exists } from 'faunadb';

const db = new Client({
    secret: process.env.FAUNADB_SECRET
});

export const getHeaders = () => {
    if (process.env.LOCAL) {
        return {
            'access-control-allow-origin': '*'
        };
    }
    return undefined;
};

export const returnError = (e) => {
    return {
        statusCode: 400,
        body: JSON.stringify(e)
    };
};

export const validateTrackName = (body) => {
    if (!Object.prototype.hasOwnProperty.call(body, 'trackName')) {
        throw "Missing 'trackName' property on the body.";
    }
    if (typeof body.trackName !== 'string') {
        throw 'trackName needs to be a string.';
    }
    const trackName = body.trackName.trim();
    if (trackName === COLLECTION_NAME_CONFIG) {
        throw `Invalid trackName '${trackName}'`;
    }
    const regexRule = /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/;
    if (!regexRule.test(trackName)) {
        throw `Invalid trackName '${trackName}'`;
    }
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

export const createCollection = async (name) => {
    await db.query(CreateCollection({ name }));
};
