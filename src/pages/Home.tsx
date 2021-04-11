import React, { FormEvent, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { trackerCreate } from '../api/trackerCreate';
import { NAME_RULE } from '../config';
import { saveSecret } from '../utils/storage';

export default function Home(): JSX.Element {
    const [name, setName] = useState('');
    const [host, setHost] = useState('');
    const history = useHistory();

    useEffect(() => {
        setHost(`https://${window.location.host}/t/`);
    }, []);

    const submitNewTracker = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const secret = await trackerCreate(name);

            console.table({ secret });
            saveSecret(secret);
            history.push(`/t/${name}`);
        } catch (e) {
            console.error({ msg: e.msg, code: e.internalCode });
        }
    };

    return (
        <main>
            <h1>Erstelle deinen eigenen Tracker</h1>
            <form onSubmit={submitNewTracker}>
                <label htmlFor="name">Gib deinem Tracker einen Namen:</label>
                {host}
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
    );
}
