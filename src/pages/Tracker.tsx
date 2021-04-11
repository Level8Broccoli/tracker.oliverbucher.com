import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { createEntryRequest, deleteTrackerRequest, readAllEntryRequest } from '../api/api';
import { entry } from '../api/schemas';
import { getSecret } from '../utils/storage';

export default function Tracker(): JSX.Element {
    const { name } = useParams<{ name: string }>();
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

    const deleteTracker = () => {
        const secret = getSecret();
        if (typeof secret === 'string' && typeof name === 'string') {
            console.log(secret);
            deleteTrackerRequest(name, secret);
        }
    };

    return (
        <main>
            <p>Name: {name}</p>
            <button onClick={createEntry}>+</button>
            <button onClick={deleteTracker}>Löschen</button>
            {/* <button onClick={authenticate}>Authentifizieren</button> */}
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
