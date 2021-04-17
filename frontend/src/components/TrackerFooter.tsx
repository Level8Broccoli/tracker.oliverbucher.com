import React from 'react';
import { DateTime } from 'luxon';

type Prop = {
    name: string;
    createdDate?: DateTime;
    countDisplay: number;
    countTotal: number;
};

export default function TrackerFooter({
    name,
    createdDate,
    countDisplay,
    countTotal
}: Prop): JSX.Element {
    return (
        <footer className="TrackerFooter">
            {typeof createdDate !== 'undefined' ? (
                <span>
                    Tracker &lsquo;{name}&rsquo; wurde erstellt am{' '}
                    {createdDate.setLocale('de').toFormat('dd. LLLL yyyy, H.mm')} Uhr{' '}
                </span>
            ) : (
                ''
            )}
            | angezeigte Einträge {countDisplay} / {countTotal}
        </footer>
    );
}
