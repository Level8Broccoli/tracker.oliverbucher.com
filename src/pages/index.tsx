import Head from 'next/head';
import { FormEvent, useState } from 'react';
import { createTrackerRequest } from '../api';
import { NAME_RULE } from '../config';

export default function Home(): JSX.Element {
    const [name, setName] = useState('');

    const createTracker = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const secret = await createTrackerRequest(name);
            console.table({ secret });
        } catch (e) {
            console.error({ msg: e.msg, code: e.internalCode });
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
                    {window.location.host}/
                    <input
                        id="name"
                        type="text"
                        placeholder="dein-name"
                        pattern={NAME_RULE.toString().slice(1, -1)}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <button type="submit">Erstellen</button>
                </form>
            </main>
        </div>
    );
}
