import { CONFIGS_COLLECTION, NAME_RULE, SECRET_RULE } from './config';

export const parseAndValidateTrackName = (body) => {
    if (!Object.prototype.hasOwnProperty.call(body, 'trackName')) {
        throw "Missing 'trackName' property on the body.";
    }
    if (typeof body.trackName !== 'string') {
        throw 'trackName needs to be a string.';
    }
    const trackName = body.trackName.trim();
    if (!NAME_RULE.test(trackName) || trackName === CONFIGS_COLLECTION) {
        throw `Invalid trackName '${trackName}'`;
    }
    return trackName;
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
