import { ENTRY_POINT, HOST } from '../urls';
import { errorResponse, trackerDeleteResponse } from './schemas';

export const trackerDelete = async (
    name: string,
    secret: string
): Promise<{ msg: string; error: boolean }> => {
    const res = await fetch(`${HOST + ENTRY_POINT.TRACKER_DELETE}/${name}`, {
        method: 'DELETE',
        body: JSON.stringify({
            secret
        })
    });
    const { data }: errorResponse | trackerDeleteResponse = await res.json();

    if ('data' in data) {
        return {
            msg: 'Erfolgreich gelöscht',
            error: false
        };
    } else {
        return {
            msg: data.msg,
            error: true
        };
    }
};
