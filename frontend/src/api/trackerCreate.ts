import { DateTime } from 'luxon';
import { ENTRY_POINT, HOST } from '../urls';
import { errorResponseAPI, trackerCreateAPI } from './schemas';

export const trackerCreate = async (name: string): Promise<{ data: string; error: boolean }> => {
    const timestamp = DateTime.now().toISO();
    const res = await fetch(HOST + ENTRY_POINT.TRACKER_CREATE, {
        method: 'POST',
        body: JSON.stringify({
            name,
            timestamp
        })
    });
    const { data }: errorResponseAPI | trackerCreateAPI = await res.json();
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
