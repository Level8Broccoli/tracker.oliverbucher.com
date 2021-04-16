import React, { FormEvent, useEffect, useState } from 'react';
import PageNotFound from './PageNotFound';
import { useParams } from 'react-router';
import { entryModel } from '../models/models';
import { entryReadAll } from '../api/entryReadAll';
import { entryReadMore } from '../api/entryReadMore';
import { entryCreate } from '../api/entryCreate';
import { trackerDelete } from '../api/trackerDelete';
import { entryDelete } from '../api/entryDelete';
import { auth } from '../api/auth';
import { SECRET_RULE } from '../config';
import { deleteSecret, getSecret, saveSecret } from '../utils/storage';
import { useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';

export default function Tracker(): JSX.Element {
    const { name } = useParams<{ name: string }>();
    const [entries, setEntries] = useState<entryModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [secret, setSecret] = useState('');
    const [nextId, setNextId] = useState<number>();
    const [count, setCount] = useState(0);
    const [createdDate, setCreatedDate] = useState<DateTime>();
    const history = useHistory();

    useEffect(() => {
        (async () => {
            if (typeof name === 'string') {
                const secret = getSecret(name);
                if (typeof secret === 'string') {
                    const isAuthenticated = await auth(name, secret);
                    setAuthenticated(isAuthenticated);
                }

                const res = await entryReadAll(name);
                setLoading(false);

                if (typeof res === 'undefined' || typeof res === 'string') {
                    return;
                }
                const { data, count, next, created } = res;
                setEntries(data);
                setCount(count);
                setNextId(next);
                setCreatedDate(created);
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
                setCount((prev) => prev + 1);
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

    const deleteEntry = async (index: number, id: number) => {
        const secret = getSecret(name);
        if (typeof secret === 'string' && typeof name === 'string') {
            const success = await entryDelete(name, secret, id);
            if (success) {
                setEntries((prevList) => {
                    const newList = [...prevList];
                    newList.splice(index, 1);
                    return newList;
                });
                setCount((prev) => prev - 1);
            }
        }
    };

    const authenticate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        saveSecret(name, secret);
        const isAuthenticated = await auth(name, secret);
        setAuthenticated(isAuthenticated);
    };

    const logout = () => {
        deleteSecret(name);
        setAuthenticated(false);
    };

    const loadMoreAfter = async () => {
        if (typeof nextId !== 'undefined') {
            const res = await entryReadMore(name, nextId);
            if (typeof res === 'undefined' || typeof res === 'string') {
                return;
            }
            const { data, count, next } = res;
            setEntries((prevData) => {
                return [...prevData, ...data];
            });
            setCount(count);
            setNextId(next);
        }
    };

    if (!loading && entries.length === 0) {
        return <PageNotFound />;
    }

    return (
        <main>
            <h1>
                <a href="/">TRKR</a>
            </h1>
            <p>
                Name: {name} (Anzahl Einträge: {count})
            </p>
            <button onClick={createEntry}>+</button>
            {authenticated && <button onClick={deleteTracker}>Löschen</button>}
            {authenticated ? (
                <div>
                    <h2>Online</h2>
                    <form onSubmit={logout}>
                        <button type="submit">Abmelden</button>
                    </form>
                </div>
            ) : (
                <form onSubmit={authenticate}>
                    <label htmlFor="secret">Geheimwörter</label>
                    <input
                        id="secret"
                        type="text"
                        placeholder="deine Geheimwörter"
                        pattern={SECRET_RULE.toString().slice(1, -1)}
                        value={secret}
                        onChange={(e) => setSecret(e.target.value)}
                    />
                    <button type="submit">Anmelden</button>
                </form>
            )}
            <ul>
                {entries.map((entry, i) => (
                    <li key={entry.ref}>
                        {entry.type} | {entry.timestamp.toISO()} | {entry.ref}
                        <button onClick={() => deleteEntry(i, entry.ref)}>x</button>
                    </li>
                ))}
            </ul>
            {nextId && <button onClick={loadMoreAfter}>Lade mehr Einträge</button>}
            {createdDate?.toISO() || ' notSet'}
        </main>
    );
}
