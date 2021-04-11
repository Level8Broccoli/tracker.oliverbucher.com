import { createTracker, nameAlreadyExists } from './db/trackers';
import { methods } from './http/utils';
import { INTERNAL_CODES } from './utils/config';
import { badRequest, created, methodNotAllowed, ok, serverError } from './utils/responses';
import { nameIsValid, timestampIsValid } from './utils/validation';

export async function handler({ body, httpMethod }) {
    if (httpMethod !== methods.POST) {
        return methodNotAllowed();
    }

    const { name, timestamp } = JSON.parse(body);
    if (typeof name !== 'string' || typeof timestamp !== 'string') {
        return badRequest();
    }

    if (!nameIsValid(name)) {
        return ok({
            data: { msg: `Gewählter Name '${name}' ist nicht valide.` },
            code: INTERNAL_CODES.PROPERTY.NAME
        });
    }

    if (!timestampIsValid(timestamp)) {
        return ok({
            data: { msg: `Zeitstempel '${timestamp}' ist nicht valide.` },
            code: INTERNAL_CODES.PROPERTY.TIMESTAMP
        });
    }

    try {
        if (await nameAlreadyExists(name)) {
            return ok({
                data: { msg: `Name '${name}' ist bereits in Verwendung.` },
                code: INTERNAL_CODES.NAME_DUPLICATE
            });
        }

        const secret = await createTracker(name, timestamp);

        return created({
            data: { secret },
            code: INTERNAL_CODES.SUCCESS
        });
    } catch (e) {
        return serverError(e);
    }
}
