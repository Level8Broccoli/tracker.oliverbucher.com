import React from 'react';
import { entryModel } from '../models/models';

type Prop = {
    entry: entryModel;
    loggedIn: boolean;
    deleteEntry: (id: number) => void;
    createEntry: () => void;
    CREATE_REF: number;
};

export default function Entry({
    entry,
    loggedIn,
    deleteEntry,
    createEntry,
    CREATE_REF
}: Prop): JSX.Element {
    if (entry.ref === CREATE_REF) {
        return (
            <li key={entry.ref}>
                <button onClick={createEntry}>
                    <i className="fad fa-plus"></i>
                </button>
            </li>
        );
    }

    return (
        <li key={entry.ref}>
            <div>
                {entry.timestamp.setLocale('de').toFormat('dd. LLLL yyyy, H.mm')} Uhr {' '}
                {loggedIn && <button onClick={() => deleteEntry(entry.ref)}>x</button>}{' '}
            </div>
        </li>
    );
}
