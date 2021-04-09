import {
    getHeaders,
    returnError,
    validateTrackName,
    createConfigCollectionIfNotExists
} from './util/utils';

export async function handler({ body }) {
    try {
        validateTrackName(JSON.parse(body));
        createConfigCollectionIfNotExists();

        return {
            statusCode: 200,
            body: JSON.stringify({}),
            headers: getHeaders()
        };
    } catch (e) {
        return returnError(e);
    }
}
