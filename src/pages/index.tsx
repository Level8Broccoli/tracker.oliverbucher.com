import Head from 'next/head';
import { FormEvent, useEffect, useState } from 'react';

export default function Home(): JSX.Element {
    const [url, setUrl] = useState('');
    const [host, setHost] = useState('');

    useEffect(() => {
        const HOST =
            typeof window === 'undefined' || window.location.hostname === 'localhost'
                ? 'localhost'
                : window.location.href;
        const ENDPOINT = '.netlify/functions/tracker-create';
        setUrl(HOST === 'localhost' ? `http://localhost:9000/${ENDPOINT}` : HOST + ENDPOINT);
        setHost(HOST);
    }, []);

    const createTracker = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify({ name: 'test' })
        });
        await console.log({ res, url, host });
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
                    <label htmlFor="slug">Gib deinem Tracker einen Namen:</label>
                    {host}/
                    <input id="slug" type="text" placeholder="dein-name" />
                    <button type="submit">Erstellen</button>
                </form>
            </main>
        </div>
    );
}
