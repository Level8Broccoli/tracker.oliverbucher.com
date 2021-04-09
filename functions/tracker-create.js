import { getHeaders, returnError, returnMethodNotAllowed } from './utils/common';
import {
    checkIftrackerNameAlreadyExists,
    createConfigCollectionIfNotExists,
    createtrackerCollection,
    createtrackerConfig
} from './utils/db';
import { getRandomSecret } from './utils/secret';
import { parseAndValidateTimestamp, parseAndValidatetrackerName } from './utils/validation';

export async function handler({ body, httpMethod }) {
    if (httpMethod !== 'POST') {
        return returnMethodNotAllowed();
    }

    try {
        const name = parseAndValidatetrackerName(JSON.parse(body));
        const timestamp = parseAndValidateTimestamp(JSON.parse(body));

        await createConfigCollectionIfNotExists();
        if (await checkIftrackerNameAlreadyExists(name)) {
            throw `name '${name}' is already in use.`;
        }

        const secret = getRandomSecret();
        await createtrackerConfig(name, secret, timestamp);
        await createtrackerCollection(name, timestamp);

        return {
            statusCode: 201,
            body: JSON.stringify({ secret }),
            headers: getHeaders()
        };
    } catch (e) {
        return returnError(e);
    }
}
