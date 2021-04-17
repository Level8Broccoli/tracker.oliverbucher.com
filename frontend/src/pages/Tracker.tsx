import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { auth } from '../api/auth';
import { entryReadAll } from '../api/entryReadAll';
import { entryReadMore } from '../api/entryReadMore';
import EntriesDisplay from '../components/EntriesDisplay';
import LoggedIn from '../components/LoggedIn';
import LoggedOut from '../components/LoggedOut';
import Sidebar from '../components/Sidebar';
import TrackerFooter from '../components/TrackerFooter';
import WithSidebar from '../layout/WithSidebar';
import { entryModel } from '../models/models';
import { getSecret } from '../utils/storage';
import PageNotFound from './PageNotFound';

export default function Tracker(): JSX.Element {
    const { name } = useParams<{ name: string }>();
    const [entries, setEntries] = useState<entryModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [doesNotExist, setDoesNotExist] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [secret, setSecret] = useState('');
    const [nextId, setNextId] = useState<number>();
    const [count, setCount] = useState(0);
    const [createdDate, setCreatedDate] = useState<DateTime>();

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
                    setDoesNotExist(true);
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

    if (!loading && doesNotExist) {
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
                    <EntriesDisplay
                        name={name}
                        setEntries={setEntries}
                        setCount={setCount}
                        entries={entries}
                        loggedIn={loggedIn}
                    />
                    {nextId && (
                        <button className="small" onClick={loadMoreAfter}>
                            lade ältere Einträge
                            <i className="fad fa-angle-double-right"></i>
                        </button>
                    )}
                    <TrackerFooter
                        name={name}
                        createdDate={createdDate}
                        countDisplay={entries.length}
                        countTotal={count}
                    />
                </>
            }
        />
    );
}
