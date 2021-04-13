import { DateTime } from 'luxon';
import { entryCreateModel, entryModel } from '../models/models';
import { ENTRY_POINT, HOST } from '../urls';
import { entryCreateAPI, errorResponseAPI } from './schemas';

const parseTimestamp = ({
    data,
    code
}: errorResponseAPI | entryCreateAPI): errorResponseAPI | entryCreateModel => {
    if ('entry' in data) {
        return {
            data: {
                entry: {
                    ...data.entry,
                    timestamp: DateTime.fromISO(data.entry.timestamp)
                }
            },
            code
        };
    }
    return { data, code };
};

export const entryCreate = async (name: string, secret: string): Promise<string | entryModel> => {
    const timestamp = DateTime.now().toISO();
    const res = await fetch(HOST + ENTRY_POINT.ENTRY_CREATE, {
        method: 'POST',
        body: JSON.stringify({
            name,
            secret,
            timestamp
        })
    });
    const { data } = parseTimestamp(await res.json());

    if ('entry' in data) {
        return data.entry;
    }
    return data.msg;
};
