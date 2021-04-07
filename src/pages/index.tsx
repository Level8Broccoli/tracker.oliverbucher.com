import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function Home(): JSX.Element {
    const [url, setUrl] = useState('');
    const [host, setHost] = useState('');

    useEffect(() => {
        const HOST = typeof window === 'undefined' ? 'localhost' : window.location.host;
        const ENDPOINT = '/.netlify/functions/tracker-create';
        setUrl(HOST === 'localhost' ? `http://localhost:9000${ENDPOINT}` : ENDPOINT);
        setHost(HOST);
    }, []);

    return (
        <div>
            <Head>
                <title>Tracker</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <h1>Erstelle deinen eigenen Tracker</h1>
                <form action={url} method="POST">
                    <div className="field">
                        <label className="label" htmlFor="name">
                            Name
                        </label>
                        <div className="control">
                            {host}/
                            <input className="input" type="text" placeholder="Text input" />
                        </div>
                    </div>
                </form>
            </main>
        </div>
    );
}
