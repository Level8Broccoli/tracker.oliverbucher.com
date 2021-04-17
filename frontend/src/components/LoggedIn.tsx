import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { trackerDelete } from '../api/trackerDelete';
import { deleteSecret, getSecret } from '../utils/storage';
import Cluster from '../layout/Cluster';
import Stack from '../layout/Stack';

type Props = {
    name: string;
    secret: string;
    setSecret: (s: string) => void;
    logout: () => void;
};

export default function LoggedIn({ name, secret, setSecret, logout }: Props): JSX.Element {
    const history = useHistory();
    const [showSecret, setShowSecret] = useState(false);

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

    return (
        <Stack>
            <h2>{name}</h2>
            <Cluster>
                <div>
                    <button onClick={handleLogout} className="small">
                        <i className="fad fa-sign-out-alt"></i> Abmelden
                    </button>
                </div>
                <div>
                    <button onClick={deleteTracker} className="small">
                        <i className="fad fa-trash-alt"></i> Tracker Löschen
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
