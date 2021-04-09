import { COLLECTION_NAME_CONFIG } from './config';

export const validateTrackName = (body) => {
    if (!Object.prototype.hasOwnProperty.call(body, 'trackName')) {
        throw "Missing 'trackName' property on the body.";
    }
    if (typeof body.trackName !== 'string') {
        throw 'trackName needs to be a string.';
    }
    const trackName = body.trackName.trim();
    const regexRule = /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/;
    if (!regexRule.test(trackName) || trackName === COLLECTION_NAME_CONFIG) {
        throw `Invalid trackName '${trackName}'`;
    }
};
