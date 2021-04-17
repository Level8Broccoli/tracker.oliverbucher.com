import React, { FormEvent, useEffect, useState } from 'react';
import PageNotFound from './PageNotFound';
import { useParams } from 'react-router';
import { entryModel } from '../models/models';
import { entryReadAll } from '../api/entryReadAll';
import { entryReadMore } from '../api/entryReadMore';
import { entryCreate } from '../api/entryCreate';
import { trackerDelete } from '../api/trackerDelete';
import { entryDelete } from '../api/entryDelete';
import WithSidebar from '../layout/WithSidebar';
import LoggedIn from '../components/LoggedIn';
import LoggedOut from '../components/LoggedOut';
import { auth } from '../api/auth';
import { SECRET_RULE } from '../config';
import { deleteSecret, getSecret, saveSecret } from '../utils/storage';
import { useHistory } from 'react-router-dom';
import { DateTime } from 'luxon';
import Sidebar from '../components/Sidebar';

export default function Tracker(): JSX.Element {
    const { name } = useParams<{ name: string }>();
    const [entries, setEntries] = useState<entryModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [loggedIn, setLoggedIn] = useState(false);
    const [secret, setSecret] = useState('');
    const [nextId, setNextId] = useState<number>();
    const [count, setCount] = useState(0);
    const [createdDate, setCreatedDate] = useState<DateTime>();
    const history = useHistory();

    useEffect(() => {
        (async () => {
            if (typeof name === 'string') {
                document.title = `${name} | ${document.title}`;
                const secret = getSecret(name);
                if (typeof secret === 'string') {
                    const isAuthenticated = await auth(name, secret);
                    setLoggedIn(isAuthenticated);
                    setSecret(secret);
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
                    return [data, ...prev];
                });
                setCount((prev) => prev + 1);
            }
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
        <WithSidebar
            sidebar={
                <Sidebar>
                    {loggedIn ? (
                        <LoggedIn
                            name={name}
                            secret={secret}
                            setSecret={setSecret}
                            logout={() => setLoggedIn(false)}
                        />
                    ) : (
                        <LoggedOut
                            name={name}
                            secret={secret}
                            setSecret={setSecret}
                            login={() => setLoggedIn(true)}
                        />
                    )}
                </Sidebar>
            }
            main={
                <>
                    {loggedIn && <button onClick={createEntry}>+</button>}
                    <ul>
                        {entries.map((entry, i) => (
                            <li key={entry.ref}>
                                {entry.type} | {entry.timestamp.toLocaleString()}
                                <button onClick={() => deleteEntry(i, entry.ref)}>x</button>
                            </li>
                        ))}
                    </ul>
                    {nextId && <button onClick={loadMoreAfter}>Lade mehr Einträge</button>}
                    {createdDate?.toLocaleString()} | {entries.length} / {count}
                </>
            }
        />
    );
}
