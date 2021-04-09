import { CONFIGS_COLLECTION, NAME_RULE, SECRET_RULE } from './config';

export const parseAndValidatetrackerName = (body) => {
    if (!Object.prototype.hasOwnProperty.call(body, 'name')) {
        throw {
            msg: "Missing 'name' property on the body.",
            internalCode: 1,
            statusCode: 422
        };
    }
    if (typeof body.name !== 'string') {
        throw {
            msg: 'name needs to be a string.',
            internalCode: 1,
            statusCode: 422
        };
    }
    const name = body.name.trim();
    if (!NAME_RULE.test(name) || name === CONFIGS_COLLECTION) {
        throw {
            msg: `Invalid name '${name}'`,
            internalCode: 1,
            statusCode: 422
        };
    }
    return name;
};

export const parseAndValidateSecret = (body) => {
    if (!Object.prototype.hasOwnProperty.call(body, 'secret')) {
        throw {
            msg: "Missing 'secret' property on the body.",
            internalCode: 2,
            statusCode: 422
        };
    }
    if (typeof body.secret !== 'string') {
        throw {
            msg: 'secret needs to be a string.',
            internalCode: 2,
            statusCode: 422
        };
    }
    const secret = body.secret.trim();
    if (!SECRET_RULE.test(secret)) {
        throw {
            msg: `Invalid secret '${secret}'`,
            internalCode: 2,
            statusCode: 422
        };
    }
    return secret;
};

export const parseAndValidateTimestamp = (body) => {
    if (!Object.prototype.hasOwnProperty.call(body, 'timestamp')) {
        throw {
            msg: "Missing 'timestamp' property on the body.",
            internalCode: 3,
            statusCode: 422
        };
    }
    if (typeof body.timestamp !== 'string') {
        throw {
            msg: 'timestamp needs to be a string.',
            internalCode: 3,
            statusCode: 422
        };
    }

    return new Date(body.timestamp);
};
