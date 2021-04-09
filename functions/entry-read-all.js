import { getHeaders, returnError, returnMethodNotAllowed } from './utils/common';
import { getAllEntries } from './utils/db';
import { parseAndValidateTrackName } from './utils/validation';

export async function handler({ body, httpMethod }) {
    if (httpMethod !== 'GET') {
        return returnMethodNotAllowed();
    }

    try {
        const trackName = parseAndValidateTrackName(JSON.parse(body));

        const data = await getAllEntries(trackName);

        return {
            statusCode: 201,
            body: JSON.stringify({ data }),
            headers: getHeaders()
        };
    } catch (e) {
        return returnError(e);
    }
}
