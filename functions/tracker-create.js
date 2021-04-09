import {
    createConfigCollectionIfNotExists,
    checkIfTrackNameAlreadyExists,
    createTrackConfig,
    createTrackCollection
} from './utils/db';
import { parseAndValidateTrackName } from './utils/validation';
import { getHeaders, returnError } from './utils/common';
import { getRandomSecret } from './utils/wordList';

export async function handler({ body }) {
    try {
        const trackName = parseAndValidateTrackName(JSON.parse(body));
        await createConfigCollectionIfNotExists();
        if (await checkIfTrackNameAlreadyExists(trackName)) {
            throw `trackName '${trackName}' is already in use.`;
        }

        const secret = getRandomSecret();
        await createTrackConfig(trackName, secret);
        await createTrackCollection(trackName);

        return {
            statusCode: 200,
            body: JSON.stringify({ secret }),
            headers: getHeaders()
        };
    } catch (e) {
        return returnError(e);
    }
}
