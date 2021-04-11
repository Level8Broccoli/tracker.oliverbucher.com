import React, { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
    authRequest,
    createEntryRequest,
    deleteTrackerRequest,
    readAllEntryRequest
} from '../api/api';
import { entry } from '../api/schemas';
import { SECRET_RULE } from '../config';
import { getSecret, saveSecret } from '../utils/storage';

export default function Tracker(): JSX.Element {
    const { name } = useParams<{ name: string }>();
    const [entries, setEntries] = useState<entry[]>([]);
    const [secret, setSecret] = useState('');

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

    const authenticate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        saveSecret(secret);
        try {
            const res = await authRequest(name, secret);
            console.log({ res });
        } catch (e) {
            console.error({ msg: e.msg, code: e.internalCode });
        }
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
                        {entry.type} | {entry.timestamp.toISOString()}
                    </li>
                ))}
            </ul>
        </main>
    );
}
