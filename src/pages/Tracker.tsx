import React, { FormEvent, useEffect, useState } from 'react';
import PageNotFound from './PageNotFound';
import { useParams } from 'react-router';
import { entryModel } from '../models/models';
import { entryReadAll } from '../api/entryReadAll';
import { entryCreate } from '../api/entryCreate';
import { trackerDelete } from '../api/trackerDelete';
import { auth } from '../api/auth';
import { SECRET_RULE } from '../config';
import { deleteSecret, getSecret, saveSecret } from '../utils/storage';
import { useHistory } from 'react-router-dom';

export default function Tracker(): JSX.Element {
    const { name } = useParams<{ name: string }>();
    const [entries, setEntries] = useState<entryModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [secret, setSecret] = useState('');
    const history = useHistory();

    useEffect(() => {
        (async () => {
            if (typeof name === 'string') {
                const data = await entryReadAll(name);

                setLoading(false);
                if (typeof data !== 'string' && typeof data !== 'undefined') {
                    setEntries(data);
                }

                const secret = getSecret(name);
                if (typeof secret === 'string') {
                    const isAuthenticated = await auth(name, secret);
                    setAuthenticated(isAuthenticated);
                }
            }
        })();
    }, [name]);

    const createEntry = async () => {
        const secret = getSecret(name);
        if (typeof secret === 'string' && typeof name === 'string') {
            const data = await entryCreate(name, secret);

            if (typeof data !== 'string') {
                setEntries((prev) => {
                    return [...prev, data];
                });
            }
        }
    };

    const deleteTracker = async () => {
        const secret = getSecret(name);
        if (typeof secret === 'string' && typeof name === 'string') {
            await trackerDelete(name, secret);
            deleteSecret(name);
            history.push('/');
        }
    };

    const authenticate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        saveSecret(name, secret);
        const isAuthenticated = await auth(name, secret);
        setAuthenticated(isAuthenticated);
    };

    if (!loading && entries.length === 0) {
        return <PageNotFound></PageNotFound>;
    }

    return (
        <main>
            <p>Name: {name}</p>
            <button onClick={createEntry}>+</button>
            <button onClick={deleteTracker}>Löschen</button>
            {authenticated ? (
                <h2>Online</h2>
            ) : (
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
            )}
            <ul>
                {entries.map((entry, i) => (
                    <li key={i}>
                        {entry.type} | {entry.timestamp.toISO()}
                    </li>
                ))}
            </ul>
        </main>
    );
}
