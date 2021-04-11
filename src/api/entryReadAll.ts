import { entry, entryReadAllResponse, entryResponse, errorResponse } from './schemas';
import { ENTRY_POINT, HOST } from '../urls';

interface entryReadAllResponseBeforeParsing {
    data: { data: entryResponse[] };
    code: number;
}

const parseTimestamps = ({
    data,
    code
}: errorResponse | entryReadAllResponseBeforeParsing): errorResponse | entryReadAllResponse => {
    if ('data' in data) {
        const parsedList = data.data.map((entry) => ({
            type: entry.type,
            timestamp: new Date(entry.timestamp)
        }));

        return {
            data: { data: parsedList },
            code
        };
    }
    return { data, code };
};

export const entryReadAll = async (name: string): Promise<entry[] | string> => {
    const res = await fetch(`${HOST + ENTRY_POINT.ENTRY_READ_ALL}/${name}`);

    const { data } = parseTimestamps(await res.json());

    if ('data' in data) {
        return data.data;
    }
    return data.msg;
};
