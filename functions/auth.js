import { verifySecret } from './db/auth';
import { INTERNAL_CODES } from './utils/config';
import { badRequest, methodNotAllowed, ok, serverError } from './utils/responses';
import { nameIsValid, secretIsValid } from './utils/validation';

export async function handler({ body, httpMethod }) {
    if (httpMethod !== 'POST') {
        return methodNotAllowed();
    }

    const { name, secret } = JSON.parse(body);
    if (typeof name !== 'string' || typeof secret !== 'string') {
        return badRequest();
    }

    if (!nameIsValid(name)) {
        return ok({
            data: { msg: `Gewählter Name '${name}' ist nicht valide.` },
            code: INTERNAL_CODES.PROPERTY.NAME
        });
    }

    if (!secretIsValid(secret)) {
        return ok({
            data: { msg: `Geheimwort '${secret}' ist nicht valide.` },
            code: INTERNAL_CODES.PROPERTY.SECRET
        });
    }

    try {
        const secretVerified = await verifySecret(name, secret);

        return ok({
            data: { secretVerified },
            code: INTERNAL_CODES.AUTHENTIFICATION
        });
    } catch (e) {
        return serverError(e);
    }
}
