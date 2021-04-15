import { ENTRY_POINT, HOST } from '../urls';
import { errorResponseAPI, entryCreateAPI } from './schemas';

export const entryDelete = async (name: string, secret: string, id: number): Promise<boolean> => {
    const res = await fetch(`${HOST}${ENTRY_POINT.ENTRY_DELETE}/${name}`, {
        method: 'DELETE',
        body: JSON.stringify({
            secret,
            id
        })
    });

    const { data }: errorResponseAPI | entryCreateAPI = await res.json();

    return 'entry' in data;
};
