import { authenticate } from './utils/auth';
import { getHeaders, returnError, methodNotAllowed } from './utils/common';
import { deletetracker } from './utils/db';
import { parseAndValidatetrackerName, parseAndValidateSecret } from './utils/validation';

export async function handler({ body, httpMethod }) {
    if (httpMethod === 'OPTIONS') {
        return {
            statusCode: 204,
            headers: getHeaders({
                'Access-Control-Allow-Methods': 'DELETE'
            })
        };
    }
    if (httpMethod !== 'DELETE') {
        return methodNotAllowed();
    }

    try {
        const name = parseAndValidatetrackerName(JSON.parse(body));
        const secret = parseAndValidateSecret(JSON.parse(body));
        await authenticate(name, secret);

        const data = await deletetracker(name);

        return {
            statusCode: 200,
            body: JSON.stringify({ data }),
            headers: getHeaders()
        };
    } catch (e) {
        return returnError(e);
    }
}
