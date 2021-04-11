import { NAME_RULE, SECRET_RULE } from './config';

export const nameIsValid = (name) => {
    return NAME_RULE.test(name);
};

export const secretIsValid = (secret) => {
    return SECRET_RULE.test(secret);
};

export const timestampIsValid = (timestamp) => {
    return !isNaN(Date.parse(timestamp));
};
