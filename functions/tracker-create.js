import { createConfigCollectionIfNotExists, checkIfTrackNameAlreadyExists } from './utils/db';

import { validateTrackName } from './utils/validation';

import { getHeaders, returnError } from './utils/common';

export async function handler({ body }) {
    try {
        validateTrackName(JSON.parse(body));
        await createConfigCollectionIfNotExists();
        const isUnique = await checkIfTrackNameAlreadyExists();
        console.log({ isUnique });
        return {
            statusCode: 200,
            body: JSON.stringify({}),
            headers: getHeaders()
        };
    } catch (e) {
        return returnError(e);
    }
}
