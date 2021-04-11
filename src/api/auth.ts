import { ENTRY_POINT, HOST } from '../urls';

export const auth = async (name: string, secret: string): Promise<boolean> => {
    const res = await fetch(HOST + ENTRY_POINT.AUTH, {
        method: 'POST',
        body: JSON.stringify({
            name,
            secret
        })
    });
    const data = await res.json();

    if (res.status === 200) {
        return data.success;
    } else {
        throw data;
    }
};
