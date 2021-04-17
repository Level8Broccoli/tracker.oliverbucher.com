import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router';
import { trackerCreate } from '../api/trackerCreate';
import { NAME_RULE } from '../config';
import Stack from '../layout/Stack';
import { saveSecret } from '../utils/storage';

export default function Home(): JSX.Element {
    const [name, setName] = useState('');
    const history = useHistory();

    const submitNewTracker = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { data, error } = await trackerCreate(name);

        if (error) {
            console.error(data);
        } else {
            saveSecret(name, data);
            history.push(`/${name}`);
        }
    };

    return (
        <section>
            <Stack>
                <h2>Erstelle deinen eigenen Tracker</h2>
                <form onSubmit={submitNewTracker}>
                    <div className="addon">
                        <label htmlFor="name" className="prefix">
                            trkr.lvl8.io/
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="dein-name"
                            pattern={NAME_RULE.toString().slice(1, -1)}
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <button type="submit">
                            <i className="fad fa-file-plus"></i>
                        </button>
                    </div>
                </form>
                <div>
                    <p className="small-print">Dein Name darf</p>
                    <ul className="small-print">
                        <li>(A-Z): Grossbuchstaben,</li>
                        <li>(a-z): Kleinbuchstaben,</li>
                        <li>(0-9): Zahlen und</li>
                        <li>(-): Trennstriche</li>
                    </ul>
                    <p className="small-print">beinhalten.</p>
                </div>
            </Stack>
        </section>
    );
}
