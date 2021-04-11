import { getHeaders, returnError, methodNotAllowed } from './utils/common';
import { INTERNAL_CODES } from './utils/config';
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
        return methodNotAllowed();
    }

    try {
        const name = parseAndValidatetrackerName(JSON.parse(body));
        const timestamp = parseAndValidateTimestamp(JSON.parse(body));

        await createConfigCollectionIfNotExists();
        if (await checkIftrackerNameAlreadyExists(name)) {
            throw {
                msg: `Name '${name}' is already in use.`,
                internalCode: INTERNAL_CODES.NAME_DUPLICATE,
                statusCode: 422
            };
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
