import { entry } from './schemas';
import { ENTRY_POINT, HOST } from '../urls';

export const createTrackerRequest = async (name: string): Promise<string> => {
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

export const createEntryRequest = async (name: string, secret: string): Promise<string> => {
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

export const readAllEntryRequest = async (name: string): Promise<entry[]> => {
    const res = await fetch(`${HOST + ENTRY_POINT.ENTRY_READ_ALL}/${name}`);
    const data = await res.json();

    if (res.status === 200 && data.data) {
        return data.data.map((entry: any) => {
            return {
                type: entry.type,
                timestamp: new Date(entry.timestamp['@ts'])
            };
        });
    } else {
        throw data;
    }
};
