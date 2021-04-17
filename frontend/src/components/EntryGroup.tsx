import React from 'react';
import { entryModel } from '../models/models';
import Entry from './Entry';

type Prop = {
    group: entryModel[];
    loggedIn: boolean;
    deleteEntry: (id: number) => void;
    createEntry: () => void;
    CREATE_REF: number;
};

export default function EntryGroup({
    group,
    loggedIn,
    deleteEntry,
    createEntry,
    CREATE_REF
}: Prop): JSX.Element {
    return (
        <>
            <ul className="EntryGroup">
                {group.map((entry, i) => (
                    <Entry
                        key={i}
                        CREATE_REF={CREATE_REF}
                        loggedIn={loggedIn}
                        deleteEntry={deleteEntry}
                        createEntry={createEntry}
                        entry={entry}
                    />
                ))}
            </ul>
            <hr />
        </>
    );
}
