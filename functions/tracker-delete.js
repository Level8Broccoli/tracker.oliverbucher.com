import { verifySecret } from './db/auth';
import { deleteTracker } from './db/trackers';
import { INTERNAL_CODES } from './utils/config';
import { badRequest, methodNotAllowed, noContent, ok, serverError } from './utils/responses';
import { nameIsValid, secretIsValid } from './utils/validation';

export async function handler({ path, body, httpMethod }) {
    if (httpMethod === 'OPTIONS') {
        return noContent({
            'Access-Control-Allow-Methods': 'DELETE'
        });
    }
    if (httpMethod !== 'DELETE') {
        return methodNotAllowed();
    }

    const [name] = path.split('/').slice(-1);
    const { secret } = JSON.parse(body);
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
        if (await !verifySecret(name, secret)) {
            return ok({
                data: { msg: `Authentifizierung fehlgeschlagen.` },
                code: INTERNAL_CODES.AUTHENTIFICATION
            });
        }

        const data = await deleteTracker(name);

        return ok({
            data,
            code: INTERNAL_CODES.SUCCESS
        });
    } catch (e) {
        return serverError(e);
    }
}
