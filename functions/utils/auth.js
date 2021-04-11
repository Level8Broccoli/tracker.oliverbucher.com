import { INTERNAL_CODES } from './config';
import { getConfigEntry } from './db';

export const authenticate = async (name, secret) => {
    const { data } = await getConfigEntry(name);
    if (data.secret.toLowerCase() !== secret.toLowerCase()) {
        throw {
            msg: 'Authentication failed',
            internalCode: INTERNAL_CODES.AUTHENTIFICATION_FAILED,
            statusCode: 401
        };
    }
};
