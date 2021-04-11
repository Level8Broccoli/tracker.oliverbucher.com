export const NAME_RULE = /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/;
export const SECRET_RULE = /^[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)*$/;

export const INTERNAL_CODES = {
    PROPERTY: {
        NAME: 1,
        SECRET: 2,
        TIMESTAMP: 3
    },
    NAME_DUPLICATE: 10,
    AUTHENTIFICATION: 20,
    ERROR_WHILE_CREATING_SECRET: 30,
    SUCCESS: 50,
    DB_ERROR: 90,
    DB: 95
};

export const USER_ERROR_MESSAGES = {
    FORMAT: {
        NAME:
            'Der gewählte Name liegt im falschen Format vor. Verwende nur Buchstaben von A bis Z, Ziffern und Trennstriche.',
        SECRET: 'Das Geheimwort ist nicht korrekt.'
    },
    AUTH_FAILED: 'Das Geheimwort ist nicht korrekt.',
    GENERAL: 'Leider ist ein Fehler aufgetreten. Bitte melde dich beim Administrator.'
};
