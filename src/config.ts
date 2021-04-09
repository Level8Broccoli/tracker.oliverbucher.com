export const NAME_RULE = /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/;
export const SECRET_RULE = /^[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)*$/;

export const ENTRY_TYPE = {
    CREATED: 'created',
    ENTRY: 'entry'
};

export const LOCAL_HOST_FOR_LAMBDA_FUNCTIONS = 'http://localhost:9000';

const PATH_TO_LAMBDA_FUNCTIONS = '/.netlify/functions';
export const ENTRY_POINT = {
    TRACKER_CREATE: `${PATH_TO_LAMBDA_FUNCTIONS}/tracker-create`,
    TRACKER_DELETE: `${PATH_TO_LAMBDA_FUNCTIONS}/tracker-delete`,
    ENTRY_CREATE: `${PATH_TO_LAMBDA_FUNCTIONS}/entry-create`,
    ENTRY_READ_ALL: `${PATH_TO_LAMBDA_FUNCTIONS}/entry-read-all`,
    AUTH: `${PATH_TO_LAMBDA_FUNCTIONS}/auth`
};
