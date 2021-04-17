import React, { Dispatch, SetStateAction } from 'react';
import { entryCreate } from '../api/entryCreate';
import { entryDelete } from '../api/entryDelete';
import { entryModel } from '../models/models';
import { getSecret } from '../utils/storage';

type Props = {
    name: string;
    entries: entryModel[];
    setEntries: Dispatch<SetStateAction<entryModel[]>>;
    setCount: Dispatch<SetStateAction<number>>;
    loggedIn: boolean;
};

export default function EntriesDisplay({
    name,
    entries,
    setEntries,
    setCount,
    loggedIn
}: Props): JSX.Element {
    const deleteEntry = async (index: number, id: number) => {
        const secret = getSecret(name);
        if (typeof secret === 'string' && typeof name === 'string') {
            const success = await entryDelete(name, secret, id);
            if (success) {
                setEntries((prevList) => {
                    const newList = [...prevList];
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

    return (
        <ul>
            {loggedIn && (
                <li>
                    <button onClick={createEntry}>+</button>
                </li>
            )}
            {entries.map((entry, i) => (
                <li key={entry.ref}>
                    {entry.timestamp.toLocaleString()}
                    {loggedIn && <button onClick={() => deleteEntry(i, entry.ref)}>x</button>}
                </li>
            ))}
        </ul>
    );
}
