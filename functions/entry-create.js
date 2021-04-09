import { authenticate } from './utils/auth';
import { getHeaders, returnError, returnMethodNotAllowed } from './utils/common';
import { createEntry } from './utils/db';
import {
    parseAndValidateSecret,
    parseAndValidateTimestamp,
    parseAndValidateTrackName
} from './utils/validation';

export async function handler({ body, httpMethod }) {
    if (httpMethod !== 'POST') {
        return returnMethodNotAllowed();
    }

    try {
        const trackName = parseAndValidateTrackName(JSON.parse(body));
        const timestamp = parseAndValidateTimestamp(JSON.parse(body));
        const secret = parseAndValidateSecret(JSON.parse(body));

        await authenticate(trackName, secret);

        await createEntry(trackName, timestamp);

        return {
            statusCode: 201,
            body: JSON.stringify({ secret }),
            headers: getHeaders()
        };
    } catch (e) {
        return returnError(e);
    }
}
