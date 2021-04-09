import { authenticate } from './utils/auth';
import { getHeaders, returnError, returnMethodNotAllowed } from './utils/common';
import { parseAndValidateSecret, parseAndValidateTrackName } from './utils/validation';

export async function handler({ body, httpMethod }) {
    if (httpMethod !== 'GET') {
        return returnMethodNotAllowed();
    }

    try {
        const trackName = parseAndValidateTrackName(JSON.parse(body));
        const secret = parseAndValidateSecret(JSON.parse(body));
        await authenticate(trackName, secret);

        return {
            statusCode: 200,
            body: JSON.stringify({}),
            headers: getHeaders()
        };
    } catch (e) {
        return returnError(e);
    }
}
