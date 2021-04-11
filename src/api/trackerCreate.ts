import { ENTRY_POINT, HOST } from '../urls';

export const trackerCreate = async (name: string): Promise<string> => {
    const timestamp = new Date().toISOString();
    const res = await fetch(HOST + ENTRY_POINT.TRACKER_CREATE, {
        method: 'POST',
        body: JSON.stringify({
            name,
            timestamp
        })
    });
    const data = await res.json();
    if (res.status === 201) {
        return data.secret;
    } else {
        throw data;
    }
};
