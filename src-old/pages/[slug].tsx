import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { createEntryRequest, readAllEntryRequest } from '../api';
import { entry } from '../schemas';
import { getSecret } from '../utils';

export default function Tracker(): JSX.Element {
    const router = useRouter();
    const { slug: name } = router.query;
    const [entries, setEntries] = useState<entry[]>([]);

    useEffect(() => {
        (async () => {
            if (typeof name === 'string') {
                const data = await readAllEntryRequest(name);
                console.log({ data });
                setEntries(data);
            }
        })();
    }, [name]);

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
            <ul>
                {entries.map((entry, i) => (
                    <li key={i}>
                        {entry.type} | {entry.timestamp.toISOString()}
                    </li>
                ))}
            </ul>
        </main>
    );
}
