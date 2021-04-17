import React, { FormEvent } from 'react';
import { auth } from '../api/auth';
import { SECRET_RULE } from '../config';
import Stack from '../layout/Stack';
import { saveSecret } from '../utils/storage';

type Props = {
    name: string;
    secret: string;
    setSecret: (a: string) => void;
    login: () => void;
};

export default function LoggedOut({ name, secret, setSecret, login }: Props): JSX.Element {
    const authenticate = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        saveSecret(name, secret);
        const isAuthenticated = await auth(name, secret);
        if (isAuthenticated) {
            login();
        }
    };

    return (
        <Stack>
            <h2>{name}</h2>
            <form onSubmit={authenticate}>
                <label htmlFor="secret">Anmelden</label>
                <div className="addon">
                    <input
                        id="secret"
                        type="text"
                        placeholder="deine Geheimwörter"
                        pattern={SECRET_RULE.toString().slice(1, -1)}
                        value={secret}
                        onChange={(e) => setSecret(e.target.value)}
                    />
                    <button type="submit">
                        <i className="fad fa-key"></i>
                    </button>
                </div>
            </form>
        </Stack>
    );
}
