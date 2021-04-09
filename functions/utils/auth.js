import { getConfigEntry } from './db';

export const authenticate = async (name, secret) => {
    const { data } = await getConfigEntry(name);
    if (data.secret.toLowerCase() !== secret.toLowerCase()) {
        throw 'Authentication failed';
    }
};
