import React from 'react';
import { DateTime } from 'luxon';

type Prop = {
    createdDate?: DateTime;
    countDisplay: number;
    countTotal: number;
};

export default function TrackerFooter({
    createdDate,
    countDisplay,
    countTotal
}: Prop): JSX.Element {
    return (
        <footer className="TrackerFooter">
            {typeof createdDate !== 'undefined' ? (
                <span>
                    Tracker wurde erstellt am{' '}
                    {createdDate.setLocale('de').toFormat('dd. LLLL yyyy, H.mm')} Uhr{' '}
                </span>
            ) : (
                ''
            )}
            | {countDisplay} / {countTotal}
        </footer>
    );
}
