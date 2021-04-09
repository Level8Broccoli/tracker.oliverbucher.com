import { getHeaders, returnError, returnMethodNotAllowed } from './utils/common';
import { getAllEntries } from './utils/db';
import { parseAndValidatetrackerName } from './utils/validation';

export async function handler({ body, httpMethod }) {
    if (httpMethod !== 'GET') {
        return returnMethodNotAllowed();
    }

    try {
        const name = parseAndValidatetrackerName(JSON.parse(body));

        const data = await getAllEntries(name);

        return {
            statusCode: 201,
            body: JSON.stringify({ data }),
            headers: getHeaders()
        };
    } catch (e) {
        return returnError(e);
    }
}
