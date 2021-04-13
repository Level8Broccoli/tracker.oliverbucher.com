import { ENTRY_POINT, HOST } from '../urls';
import { errorResponseAPI, authResponseAPI } from './schemas';

export const auth = async (name: string, secret: string): Promise<boolean> => {
    const res = await fetch(HOST + ENTRY_POINT.AUTH, {
        method: 'POST',
        body: JSON.stringify({
            name,
            secret
        })
    });
    const { data }: errorResponseAPI | authResponseAPI = await res.json();

    if ('secretVerified' in data) {
        return data.secretVerified;
    } else {
        console.error(data.msg);
        return false;
    }
};
