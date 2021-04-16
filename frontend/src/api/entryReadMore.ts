import { listOfEntries } from '../models/models';
import { ENTRY_POINT, HOST } from '../urls';
import { parseTimestamps } from './parseTimestamps';

export const entryReadMore = async (
    name: string,
    next: number
): Promise<listOfEntries | string | undefined> => {
    const res = await fetch(`${HOST + ENTRY_POINT.ENTRY_READ_MORE}/${name}/${next}`);

    const { data } = parseTimestamps(await res.json());

    if (data && 'data' in data) {
        return data;
    } else if (data && 'msg' in data) {
        return data.msg;
    }
};
