import { CONFIGS_COLLECTION, NAME_RULE, SECRET_RULE } from './config';

export const parseAndValidatetrackerName = (body) => {
    if (!Object.prototype.hasOwnProperty.call(body, 'name')) {
        throw "Missing 'name' property on the body.";
    }
    if (typeof body.name !== 'string') {
        throw 'name needs to be a string.';
    }
    const name = body.name.trim();
    if (!NAME_RULE.test(name) || name === CONFIGS_COLLECTION) {
        throw `Invalid name '${name}'`;
    }
    return name;
};

export const parseAndValidateSecret = (body) => {
    if (!Object.prototype.hasOwnProperty.call(body, 'secret')) {
        throw "Missing 'secret' property on the body.";
    }
    if (typeof body.secret !== 'string') {
        throw 'Secret needs to be a string.';
    }
    const secret = body.secret.trim();
    if (!SECRET_RULE.test(secret)) {
        throw `Invalid secret '${secret}'`;
    }
    return secret;
};

export const parseAndValidateTimestamp = (body) => {
    if (!Object.prototype.hasOwnProperty.call(body, 'timestamp')) {
        throw "Missing 'timestamp' property on the body.";
    }
    if (typeof body.timestamp !== 'string') {
        throw 'timestamp needs to be a string.';
    }

    return new Date(body.timestamp);
};
