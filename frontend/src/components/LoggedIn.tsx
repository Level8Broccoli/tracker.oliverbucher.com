import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { trackerDelete } from '../api/trackerDelete';
import { deleteSecret, getSecret, isFirst, setIsFirst } from '../utils/storage';
import Cluster from '../layout/Cluster';
import Stack from '../layout/Stack';
import Toast from '../components/Toast';

type Props = {
    name: string;
    secret: string;
    setSecret: (s: string) => void;
    logout: () => void;
};

export default function LoggedIn({ name, secret, setSecret, logout }: Props): JSX.Element {
    const history = useHistory();
    const [showSecret, setShowSecret] = useState(false);
    const [isFirstTime, setIsFirstTime] = useState(false);

    useEffect(() => {
        setIsFirstTime(isFirst(name));
    }, [secret]);

    const deleteTracker = async () => {
        const secret = getSecret(name);
        if (typeof secret === 'string') {
            await trackerDelete(name, secret);
            deleteSecret(name);
            history.push('/');
        }
    };

    const handleLogout = () => {
        deleteSecret(name);
        setSecret('');
        logout();
    };

    const closeToast = () => {
        setIsFirst(name, false);
        setIsFirstTime(false);
    };

    return (
        <Stack>
            <div>
                <h2>{name}</h2>
                {isFirstTime && (
                    <Toast closeToast={closeToast}>
                        <p>Lesen dürfen alle deinen TRKR!</p>
                        <p>
                            Um neue Einträge hinzuzufügen, zu entfernen oder den gesamten TRKR
                            unwiederruflich zu löschen, dazu benötigt man die passenden
                            Geheimwörter.
                        </p>
                        <p>Die Geheimwörter werden in deinem Browser gespeichert.</p>
                        <p>
                            Willst du aber deinen TRKR auf einem anderen Gerät verwenden, meldest du
                            dich ab oder hast du deinen Browser so eingestellt, dass regelmässig der
                            Cache geleert wird, dann merke dir deine Geheimwörter, damit du auch
                            später noch deinen TRKR benutzen kannst.
                        </p>
                        <p>
                            Mit einem Klick auf «Geheimwörter anzeigen» unten, kannst du dir deine
                            Geheimwörter anzeigen lassen.
                        </p>
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
                    <button onClick={deleteTracker} className="small">
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
