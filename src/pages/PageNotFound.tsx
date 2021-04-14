import React from 'react';
import { useHistory } from 'react-router-dom';

export default function PageNotFound(): JSX.Element {
    const history = useHistory();

    return (
        <main>
            <h1>Seite nicht gefunden</h1>
            <button onClick={() => history.push('/')}>Zurück zur Startseite</button>
        </main>
    );
}
