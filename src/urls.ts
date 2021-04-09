const LOCAL_HOST_FOR_LAMBDA_FUNCTIONS = 'http://localhost:9000';

const isLocal = typeof window === 'undefined' || window.location.hostname === 'localhost';

export const HOST = isLocal ? LOCAL_HOST_FOR_LAMBDA_FUNCTIONS : window.location.host;

const PATH_TO_LAMBDA_FUNCTIONS = '/.netlify/functions';
export const ENTRY_POINT = {
    TRACKER_CREATE: `${PATH_TO_LAMBDA_FUNCTIONS}/tracker-create`,
    TRACKER_DELETE: `${PATH_TO_LAMBDA_FUNCTIONS}/tracker-delete`,
    ENTRY_CREATE: `${PATH_TO_LAMBDA_FUNCTIONS}/entry-create`,
    ENTRY_READ_ALL: `${PATH_TO_LAMBDA_FUNCTIONS}/entry-read-all`,
    AUTH: `${PATH_TO_LAMBDA_FUNCTIONS}/auth`
};
