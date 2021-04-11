import React, { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { entry } from '../api/schemas';
import { entryReadAll } from '../api/entryReadAll';
import { entryCreate } from '../api/entryCreate';
import { trackerDelete } from '../api/trackerDelete';
import { auth } from '../api/auth';
import { SECRET_RULE } from '../config';
import { getSecret, saveSecret } from '../utils/storage';

export default function Tracker(): JSX.Element {
    const { name } = useParams<{ name: string }>();
    const [entries, setEntries] = useState<entry[]>([]);
    const [secret, setSecret] = useState('');

    useEffect(() => {
        (async () => {
            if (typeof name === 'string') {
                const data = await entryReadAll(name);
                setEntries(data);
            }
        })();
    }, [name]);

    const createEntry = async () => {
        const secret = getSecret();
        if (typeof secret === 'string' && typeof name === 'string') {
            const data = await entryCreate(name, secret);

            if (typeof data !== 'string') {
                setEntries((prev) => {
                    return [...prev, data];
                });
            }
        }
    };

    const deleteTracker = () => {
        const secret = getSecret();
        if (typeof secret === 'string' && typeof name === 'string') {
            trackerDelete(name, secret);
        }
    };

    const authenticate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        saveSecret(secret);
        const isAuthenticated = await auth(name, secret);
        console.log({ isAuthenticated });
    };

    return (
        <main>
            <p>Name: {name}</p>
            <button onClick={createEntry}>+</button>
            <button onClick={deleteTracker}>Löschen</button>
            <form onSubmit={authenticate}>
                <label htmlFor="secret">Geheimwort</label>
                <input
                    id="secret"
                    type="text"
                    placeholder="dein Geheimwort"
                    pattern={SECRET_RULE.toString().slice(1, -1)}
                    value={secret}
                    onChange={(e) => setSecret(e.target.value)}
                />
                <button type="submit">Anmelden</button>
            </form>
            <ul>
                {entries.map((entry, i) => (
                    <li key={i}>
                        x{entry.type} | {entry.timestamp.toISOString()}
                    </li>
                ))}
            </ul>
        </main>
    );
}
