import { methods } from './http/utils';
import { authenticate } from './utils/auth';
import { getHeaders, returnError, methodNotAllowed } from './utils/common';
import { createEntry } from './utils/db';
import {
    parseAndValidateSecret,
    parseAndValidateTimestamp,
    parseAndValidatetrackerName
} from './utils/validation';

export async function handler({ body, httpMethod }) {
    if (httpMethod !== methods.POST) {
        return methodNotAllowed();
    }

    try {
        const name = parseAndValidatetrackerName(JSON.parse(body));
        const timestamp = parseAndValidateTimestamp(JSON.parse(body));
        const secret = parseAndValidateSecret(JSON.parse(body));

        await authenticate(name, secret);

        const entry = await createEntry(name, timestamp);

        return {
            statusCode: 201,
            body: JSON.stringify({ entry }),
            headers: getHeaders()
        };
    } catch (e) {
        return returnError(e);
    }
}
