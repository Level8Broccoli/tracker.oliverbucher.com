import Head from 'next/head';
import { FormEvent, useEffect, useState } from 'react';
import { ENTRY_POINT, LOCAL_HOST_FOR_LAMBDA_FUNCTIONS } from '../config';

export default function Home(): JSX.Element {
    const [host, setHost] = useState('');

    useEffect(() => {
        const isLocal = typeof window === 'undefined' || window.location.hostname === 'localhost';

        setHost(isLocal ? LOCAL_HOST_FOR_LAMBDA_FUNCTIONS : window.location.href);
    }, []);

    const createTracker = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await fetch(`${host}${ENTRY_POINT.TRACKER_CREATE}`, {
                method: 'POST',
                body: JSON.stringify({ name: 'test' })
            });
            console.log({ res });
        } catch (error) {
            console.error({ error });
        }
    };

    return (
        <div>
            <Head>
                <title>Tracker</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>Erstelle deinen eigenen Tracker</h1>
                <form onSubmit={createTracker}>
                    <label htmlFor="name">Gib deinem Tracker einen Namen:</label>
                    {host}/
                    <input id="name" type="text" placeholder="dein-name" />
                    <button type="submit">Erstellen</button>
                </form>
            </main>
        </div>
    );
}
