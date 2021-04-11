import { createConfigCollectionIfNotExists } from './db/db';
import { methods } from './http/utils';
import { INTERNAL_CODES } from './utils/config';
import { methodNotAllowed, ok, serverError } from './utils/responses';

export async function handler({ httpMethod }) {
    if (httpMethod !== methods.POST) {
        return methodNotAllowed();
    }

    try {
        const msg = await createConfigCollectionIfNotExists();

        return ok({
            data: { msg },
            code: INTERNAL_CODES.DB
        });
    } catch (e) {
        return serverError(e);
    }
}
