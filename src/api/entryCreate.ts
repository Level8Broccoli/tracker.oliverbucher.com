import { ENTRY_POINT, HOST } from '../urls';
import { entry, entryCreateResponse, errorResponse } from './schemas';

export const entryCreate = async (name: string, secret: string): Promise<string | entry> => {
    const timestamp = new Date().toISOString();
    const res = await fetch(HOST + ENTRY_POINT.ENTRY_CREATE, {
        method: 'POST',
        body: JSON.stringify({
            name,
            secret,
            timestamp
        })
    });
    const { data }: errorResponse | entryCreateResponse = await res.json();

    if ('entry' in data) {
        return {
            ...data.entry,
            timestamp: new Date(data.entry.timestamp)
        };
    } else {
        return data.msg;
    }
};
