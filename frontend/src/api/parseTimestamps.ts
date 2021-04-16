import { DateTime } from 'luxon';
import { entryReadAllModel } from '../models/models';
import { entryReadAllAPI, errorResponseAPI } from './schemas';

export const parseTimestamps = ({
    data,
    code
}: errorResponseAPI | entryReadAllAPI): errorResponseAPI | entryReadAllModel => {
    if (data && 'data' in data) {
        const parsedList = data.data.map((entry) => ({
            ...entry,
            timestamp: DateTime.fromISO(entry.timestamp)
        }));

        return {
            data: {
                data: parsedList,
                count: data.count,
                next: data.next,
                created: DateTime.fromISO(data.created)
            },
            code
        };
    }
    return { data, code };
};
