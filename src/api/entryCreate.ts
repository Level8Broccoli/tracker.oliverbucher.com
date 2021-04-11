import { ENTRY_POINT, HOST } from '../urls';
import { entry, entryCreateResponse, entryResponse, errorResponse } from './schemas';

interface entryCreateResponseBeforeParsing {
    data: { entry: entryResponse };
    code: number;
}

const parseTimestamp = ({
    data,
    code
}: errorResponse | entryCreateResponseBeforeParsing): errorResponse | entryCreateResponse => {
    if ('entry' in data) {
        return {
            data: {
                entry: {
                    ...data.entry,
                    timestamp: new Date(data.entry.timestamp)
                }
            },
            code
        };
    }
    return { data, code };
};

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
    const { data } = parseTimestamp(await res.json());

    if ('entry' in data) {
        return data.entry;
    }
    return data.msg;
};
