import { CONFIGS_COLLECTION } from './config';

export const parseAndValidateTrackName = (body) => {
    if (!Object.prototype.hasOwnProperty.call(body, 'trackName')) {
        throw "Missing 'trackName' property on the body.";
    }
    if (typeof body.trackName !== 'string') {
        throw 'trackName needs to be a string.';
    }
    const trackName = body.trackName.trim();
    const regexRule = /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/;
    if (!regexRule.test(trackName) || trackName === CONFIGS_COLLECTION) {
        throw `Invalid trackName '${trackName}'`;
    }
    return trackName;
};
