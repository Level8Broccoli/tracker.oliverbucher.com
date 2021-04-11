import { ENTRY_POINT, HOST } from '../urls';
import { errorResponse, trackerCreateResponse } from './schemas';

export const trackerCreate = async (name: string): Promise<{ data: string; error: boolean }> => {
    const timestamp = new Date().toISOString();
    const res = await fetch(HOST + ENTRY_POINT.TRACKER_CREATE, {
        method: 'POST',
        body: JSON.stringify({
            name,
            timestamp
        })
    });
    const { data }: errorResponse | trackerCreateResponse = await res.json();
    if ('secret' in data) {
        return {
            data: data.secret,
            error: false
        };
    } else {
        return {
            data: data.msg,
            error: true
        };
    }
};
