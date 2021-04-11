import { entry } from './schemas';
import { ENTRY_POINT, HOST } from '../urls';

export const entryReadAll = async (name: string): Promise<entry[]> => {
    const res = await fetch(`${HOST + ENTRY_POINT.ENTRY_READ_ALL}/${name}`);
    const data = await res.json();
    if (res.status === 200 && data.data) {
        return data.data.map((entry: any) => {
            return {
                type: entry.type,
                timestamp: new Date(entry.timestamp)
            };
        });
    } else {
        throw data;
    }
};
