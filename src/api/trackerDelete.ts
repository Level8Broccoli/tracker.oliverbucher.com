import { ENTRY_POINT, HOST } from '../urls';

export const trackerDelete = async (name: string, secret: string): Promise<string> => {
    const res = await fetch(`${HOST + ENTRY_POINT.TRACKER_DELETE}/${name}`, {
        method: 'DELETE',
        body: JSON.stringify({
            secret
        })
    });
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
