import { authenticate } from './utils/auth';
import { getHeaders, returnError, returnMethodNotAllowed } from './utils/common';
import { deleteTrack } from './utils/db';
import { parseAndValidateTrackName, parseAndValidateSecret } from './utils/validation';

export async function handler({ body, httpMethod }) {
    if (httpMethod !== 'DELETE') {
        return returnMethodNotAllowed();
    }

    try {
        const trackName = parseAndValidateTrackName(JSON.parse(body));
        const secret = parseAndValidateSecret(JSON.parse(body));
        await authenticate(trackName, secret);

        await deleteTrack(trackName);

        return {
            statusCode: 200,
            body: JSON.stringify({}),
            headers: getHeaders()
        };
    } catch (e) {
        return returnError(e);
    }
}
