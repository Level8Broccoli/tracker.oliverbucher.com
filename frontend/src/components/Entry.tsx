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
                <button onClick={createEntry} className="create-entry">
                    <i className="fad fa-plus"></i>
                </button>
            </li>
        );
    }

    return (
        <li key={entry.ref}>
            <div>
                <p>{entry.timestamp.setLocale('de').toFormat('ccc, d.L.yy, H.mm')}&nbsp;Uhr </p>
                {loggedIn && (
                    <button className="delete-entry" onClick={() => deleteEntry(entry.ref)}>
                        <i className="fad fa-trash-alt"></i>
                    </button>
                )}
            </div>
        </li>
    );
}
