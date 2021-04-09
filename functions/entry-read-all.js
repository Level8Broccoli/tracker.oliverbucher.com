import { getHeaders, returnError, returnMethodNotAllowed } from './utils/common';
import { getAllEntries } from './utils/db';
import { validatetrackerName } from './utils/validation';

export async function handler({ path, httpMethod }) {
    if (httpMethod !== 'GET') {
        return returnMethodNotAllowed();
    }

    try {
        const name = validatetrackerName(path.split('/').slice(-1).join());
        const data = await getAllEntries(name);

        return {
            statusCode: 200,
            body: JSON.stringify({ data }),
            headers: getHeaders()
        };
    } catch (e) {
        return returnError(e);
    }
}
