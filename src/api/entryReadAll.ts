import { ENTRY_POINT, HOST } from '../urls';
import { entryReadAllAPI, errorResponseAPI } from './schemas';
import { entryModel, entryReadAllModel } from '../models/models';
import { DateTime } from 'luxon';

const parseTimestamps = ({
    data,
    code
}: errorResponseAPI | entryReadAllAPI): errorResponseAPI | entryReadAllModel => {
    if (data && 'data' in data) {
        const parsedList = data.data.map((entry) => ({
            type: entry.type,
            timestamp: DateTime.fromISO(entry.timestamp)
        }));

        return {
            data: { data: parsedList },
            code
        };
    }
    return { data, code };
};

export const entryReadAll = async (name: string): Promise<entryModel[] | string | undefined> => {
    const res = await fetch(`${HOST + ENTRY_POINT.ENTRY_READ_ALL}/${name}`);

    const { data } = parseTimestamps(await res.json());

    if (data && 'data' in data) {
        return data.data;
    } else if (data && 'msg' in data) {
        return data.msg;
    }
};
