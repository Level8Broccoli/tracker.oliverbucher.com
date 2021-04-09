import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { createEntryRequest } from '../api';
import { getSecret } from '../utils';

export default function Tracker(): JSX.Element {
    const router = useRouter();
    const { slug: name } = router.query;

    const createEntry = () => {
        const secret = getSecret();
        if (typeof secret === 'string' && typeof name === 'string') {
            console.log(secret);

            createEntryRequest(name, secret);
        }
    };

    return (
        <main>
            <p>Name: {name}</p>
            <button onClick={createEntry}>+</button>
        </main>
    );
}
