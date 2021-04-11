import { ENTRY_POINT, HOST } from '../urls';

export const entryCreate = async (name: string, secret: string): Promise<string> => {
    const timestamp = new Date().toISOString();
    const res = await fetch(HOST + ENTRY_POINT.ENTRY_CREATE, {
        method: 'POST',
        body: JSON.stringify({
            name,
            secret,
            timestamp
        })
    });
    const data = await res.json();
    if (res.status === 201) {
        return data;
    } else {
        throw data;
    }
};
