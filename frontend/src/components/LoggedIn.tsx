import React, { useEffect, useState } from 'react';
import Toast from '../components/Toast';
import Cluster from '../layout/Cluster';
import Stack from '../layout/Stack';
import { deleteSecret, isFirst, setIsFirst } from '../utils/storage';

type Props = {
    name: string;
    secret: string;
    setSecret: (s: string) => void;
    logout: () => void;
    setWantsToDeleteTracker: (b: boolean) => void;
};

export default function LoggedIn({
    name,
    secret,
    setSecret,
    logout,
    setWantsToDeleteTracker
}: Props): JSX.Element {
    const [showSecret, setShowSecret] = useState(false);
    const [isFirstTime, setIsFirstTime] = useState(false);

    useEffect(() => {
        setIsFirstTime(isFirst(name));
        setShowSecret(isFirst(name));
    }, [secret]);

    const handleLogout = () => {
        deleteSecret(name);
        setSecret('');
        logout();
    };

    const closeToast = () => {
        setIsFirst(name, false);
        setIsFirstTime(false);
    };
    const initiateDeleteTracker = () => {
        setWantsToDeleteTracker(true);
    };

    return (
        <Stack>
            <div>
                <h2>{name}</h2>
                {isFirstTime && (
                    <Toast closeToast={closeToast}>
                        <>
                            <p>
                                Um neue Einträge hinzuzufügen, zu entfernen oder den gesamten TRKR
                                unwiederruflich zu löschen, benötigst du die passenden Geheimwörter.
                                (Die Geheimwörter wurden in deinem Browser gespeichert.)
                            </p>
                            <p>
                                Willst du aber deinen TRKR auf einem <strong>anderen Gerät</strong>{' '}
                                verwenden, <strong>meldest du dich ab</strong> oder{' '}
                                <strong>löscht dein Browser automatisch deinen Cache,</strong> dann
                                merke dir deine Geheimwörter, damit du auch später noch deinen TRKR
                                benutzen kannst.
                            </p>
                            <p>
                                Mit einem Klick auf «Geheimwörter anzeigen» unten, kannst du dir
                                deine Geheimwörter anzeigen lassen.
                            </p>
                        </>
                    </Toast>
                )}
            </div>
            <Cluster>
                <div>
                    <button onClick={handleLogout} className="small">
                        <i className="fad fa-sign-out-alt"></i> Abmelden
                    </button>
                </div>
                <div>
                    <button onClick={initiateDeleteTracker} className="small warning">
                        <i className="fad fa-trash-alt"></i> deinen TRKR löschen
                    </button>
                </div>
            </Cluster>
            {showSecret ? (
                <div>
                    <Stack>
                        <button onClick={() => setShowSecret(false)} className="small">
                            <i className="fad fa-key"></i> Geheimwörter ausblenden
                        </button>
                        <input type="text" value={secret} className="small" disabled />
                    </Stack>
                </div>
            ) : (
                <div>
                    <button onClick={() => setShowSecret(true)} className="small">
                        <i className="fad fa-key"></i> Geheimwörter anzeigen
                    </button>
                </div>
            )}
        </Stack>
    );
}
