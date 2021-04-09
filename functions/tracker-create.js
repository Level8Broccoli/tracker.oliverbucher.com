import { getHeaders, returnError, returnMethodNotAllowed } from './utils/common';
import {
    checkIfTrackNameAlreadyExists,
    createConfigCollectionIfNotExists,
    createTrackCollection,
    createTrackConfig
} from './utils/db';
import { getRandomSecret } from './utils/secret';
import { parseAndValidateTimestamp, parseAndValidateTrackName } from './utils/validation';

export async function handler({ body, httpMethod }) {
    if (httpMethod !== 'POST') {
        return returnMethodNotAllowed();
    }

    try {
        const trackName = parseAndValidateTrackName(JSON.parse(body));
        const timestamp = parseAndValidateTimestamp(JSON.parse(body));

        await createConfigCollectionIfNotExists();
        if (await checkIfTrackNameAlreadyExists(trackName)) {
            throw `trackName '${trackName}' is already in use.`;
        }

        const secret = getRandomSecret();
        await createTrackConfig(trackName, secret, timestamp);
        const res = await createTrackCollection(trackName, timestamp);
        console.log({ res });

        return {
            statusCode: 201,
            body: JSON.stringify({ secret }),
            headers: getHeaders()
        };
    } catch (e) {
        return returnError(e);
    }
}
