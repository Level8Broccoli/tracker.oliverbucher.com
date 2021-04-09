import { CONFIGS_COLLECTION, NAME_RULE, SECRET_RULE, ERROR_CODES } from './config';

export const parseAndValidatetrackerName = (body) => {
    if (!Object.prototype.hasOwnProperty.call(body, 'name')) {
        throw {
            msg: "Missing 'name' property on the body.",
            internalCode: ERROR_CODES.PROPERTY.NAME,
            statusCode: 422
        };
    }
    if (typeof body.name !== 'string') {
        throw {
            msg: 'name needs to be a string.',
            internalCode: ERROR_CODES.PROPERTY.NAME,
            statusCode: 422
        };
    }
    const name = body.name.trim();
    if (!NAME_RULE.test(name) || name === CONFIGS_COLLECTION) {
        throw {
            msg: `Invalid name '${name}'`,
            internalCode: ERROR_CODES.PROPERTY.NAME,
            statusCode: 422
        };
    }
    return name;
};

export const validatetrackerName = (name) => {
    if (typeof name !== 'string') {
        throw {
            msg: 'name needs to be a string.',
            internalCode: ERROR_CODES.PROPERTY.NAME,
            statusCode: 422
        };
    }
    if (!NAME_RULE.test(name) || name === CONFIGS_COLLECTION) {
        throw {
            msg: `Invalid name '${name}'`,
            internalCode: ERROR_CODES.PROPERTY.NAME,
            statusCode: 422
        };
    }
    return name;
};

export const parseAndValidateSecret = (body) => {
    if (!Object.prototype.hasOwnProperty.call(body, 'secret')) {
        throw {
            msg: "Missing 'secret' property on the body.",
            internalCode: ERROR_CODES.PROPERTY.SECRET,
            statusCode: 422
        };
    }
    if (typeof body.secret !== 'string') {
        throw {
            msg: 'secret needs to be a string.',
            internalCode: ERROR_CODES.PROPERTY.SECRET,
            statusCode: 422
        };
    }
    const secret = body.secret.trim();
    if (!SECRET_RULE.test(secret)) {
        throw {
            msg: `Invalid secret '${secret}'`,
            internalCode: ERROR_CODES.PROPERTY.SECRET,
            statusCode: 422
        };
    }
    return secret;
};

export const parseAndValidateTimestamp = (body) => {
    if (!Object.prototype.hasOwnProperty.call(body, 'timestamp')) {
        throw {
            msg: "Missing 'timestamp' property on the body.",
            internalCode: ERROR_CODES.PROPERTY.TIMESTAMP,
            statusCode: 422
        };
    }
    if (typeof body.timestamp !== 'string') {
        throw {
            msg: 'timestamp needs to be a string.',
            internalCode: ERROR_CODES.PROPERTY.TIMESTAMP,
            statusCode: 422
        };
    }

    return new Date(body.timestamp);
};
