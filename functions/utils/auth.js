import { getConfigEntry } from './db';

export const authenticate = async (name, secret) => {
    const configEntry = await getConfigEntry(name);
    if (configEntry.secret.toLowerCase() !== secret.toLowerCase()) {
        throw 'Authentication failed';
    }
};
