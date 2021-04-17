import { DateTime } from 'luxon';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { auth } from '../api/auth';
import { entryReadAll } from '../api/entryReadAll';
import { entryReadMore } from '../api/entryReadMore';
import { trackerDelete } from '../api/trackerDelete';
import EntriesDisplay from '../components/EntriesDisplay';
import LoggedIn from '../components/LoggedIn';
import LoggedOut from '../components/LoggedOut';
import Sidebar from '../components/Sidebar';
import Toast from '../components/Toast';
import TrackerFooter from '../components/TrackerFooter';
import Stack from '../layout/Stack';
import WithSidebar from '../layout/WithSidebar';
import { entryModel } from '../models/models';
import { deleteSecret, getSecret } from '../utils/storage';
import PageNotFound from './PageNotFound';

export default function Tracker(): JSX.Element {
    const { name } = useParams<{ name: string }>();
    const [entries, setEntries] = useState<entryModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [doesNotExist, setDoesNotExist] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [wantsToDeleteTracker, setWantsToDeleteTracker] = useState(false);
    const [secret, setSecret] = useState('');
    const [nextId, setNextId] = useState<number>();
    const [count, setCount] = useState(0);
    const history = useHistory();
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

    const deleteTracker = async () => {
        const secret = getSecret(name);
        if (typeof secret === 'string') {
            await trackerDelete(name, secret);
            deleteSecret(name);
            history.push('/');
        }
    };

    if (!loading && doesNotExist) {
        return <PageNotFound />;
    }

    return (
        <WithSidebar
            sidebar={
                <Stack>
                    <Sidebar>
                        {loggedIn ? (
                            <LoggedIn
                                name={name}
                                secret={secret}
                                setSecret={setSecret}
                                logout={() => setLoggedIn(false)}
                                setWantsToDeleteTracker={setWantsToDeleteTracker}
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
                    {wantsToDeleteTracker ? (
                        <Toast closeToast={() => setWantsToDeleteTracker(false)} type={'warning'}>
                            <>
                                <p>Möchtest du deinen TRKR wirklich löschen?</p>
                                <p>
                                    <strong>
                                        Diese Aktion kann nicht rückgängig gemacht werden!
                                    </strong>
                                </p>
                                <p>
                                    <button onClick={deleteTracker} className="small">
                                        <i className="fad fa-shredder"></i>
                                        Ja, bitte alle Daten dieses TRKR löschen.
                                    </button>
                                </p>
                            </>
                        </Toast>
                    ) : (
                        <div></div>
                    )}
                </Stack>
            }
            main={
                <Stack>
                    <EntriesDisplay
                        name={name}
                        setEntries={setEntries}
                        setCount={setCount}
                        entries={entries}
                        loggedIn={loggedIn}
                        nextId={nextId}
                        loadMoreAfter={loadMoreAfter}
                    />
                    <TrackerFooter
                        name={name}
                        createdDate={createdDate}
                        countDisplay={entries.length}
                        countTotal={count}
                    />
                </Stack>
            }
        />
    );
}
