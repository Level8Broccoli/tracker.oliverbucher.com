import { DateTime, Interval } from 'luxon';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { entryCreate } from '../api/entryCreate';
import { entryDelete } from '../api/entryDelete';
import { entryModel } from '../models/models';
import { getSecret } from '../utils/storage';
import EntryGroup from '../components/EntryGroup';

type Props = {
    name: string;
    entries: entryModel[];
    setEntries: Dispatch<SetStateAction<entryModel[]>>;
    setCount: Dispatch<SetStateAction<number>>;
    loggedIn: boolean;
    nextId?: number;
    loadMoreAfter: () => void;
};

export default function EntriesDisplay({
    name,
    entries,
    setEntries,
    setCount,
    loggedIn,
    nextId,
    loadMoreAfter
}: Props): JSX.Element {
    const [entriesByGroup, setEntriesByGroup] = useState<entryModel[][]>();

    const MAX_PAUSE_LENGTH_IN_HOURS = 42;
    const CREATE_REF = -1;

    useEffect(() => {
        const buttonNewEntry = [];

        if (loggedIn) {
            buttonNewEntry.push({ timestamp: DateTime.now(), ref: CREATE_REF });
        }
        const allEntries = [...buttonNewEntry, ...entries];

        let lastElement: null | entryModel = null;
        let currentGroup: entryModel[] = [];
        const byGroup: entryModel[][] = [];

        allEntries.forEach((entry) => {
            if (lastElement !== null) {
                const currentTS = entry.timestamp;
                const lastTS = lastElement.timestamp;
                const interval = Interval.fromDateTimes(currentTS, lastTS);

                if (interval.length('hours') > MAX_PAUSE_LENGTH_IN_HOURS) {
                    byGroup.push(currentGroup);
                    currentGroup = [];
                }
            }
            lastElement = entry;
            currentGroup.push(entry);
        });
        byGroup.push(currentGroup);
        setEntriesByGroup(byGroup);
    }, [entries, loggedIn]);

    const deleteEntry = async (id: number) => {
        const secret = getSecret(name);
        if (typeof secret === 'string' && typeof name === 'string') {
            const success = await entryDelete(name, secret, id);
            if (success) {
                setEntries((prevList) => {
                    const newList = [...prevList];
                    const index = prevList.findIndex((e) => e.ref === id);
                    newList.splice(index, 1);
                    return newList;
                });
                setCount((prev) => prev - 1);
            }
        }
    };

    const createEntry = async () => {
        const secret = getSecret(name);
        if (typeof secret === 'string' && typeof name === 'string') {
            const data = await entryCreate(name, secret);

            if (typeof data !== 'string') {
                setEntries((prev) => {
                    return [data, ...prev];
                });
                setCount((prev) => prev + 1);
            }
        }
    };

    if (typeof entriesByGroup === 'undefined') {
        return <div>Keine Einträge gefunden</div>;
    }

    return (
        <div>
            {entriesByGroup.map((group, i) => (
                <EntryGroup
                    key={i}
                    CREATE_REF={CREATE_REF}
                    loggedIn={loggedIn}
                    deleteEntry={deleteEntry}
                    createEntry={createEntry}
                    group={group}
                />
            ))}
            {nextId && (
                <button className="small" onClick={loadMoreAfter}>
                    lade ältere Einträge
                    <i className="fad fa-angle-double-right"></i>
                </button>
            )}
        </div>
    );
}
