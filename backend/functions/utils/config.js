export const CONFIGS_COLLECTION = '.configs';
export const ALL_TRACKER_NAMES_INDEX = 'all_tracker_names';
export const ALL_TRACKERS_INDEX = 'all_trackers';
export const SORT_INDEX_SUFFIX = "_sort_by_timestamp_desc";

export const NAME_RULE = /^[a-zA-Z0-9]+(?:-[a-zA-Z0-9]+)*$/;
export const SECRET_RULE = /^[a-zA-Z0-9]+(?:\s[a-zA-Z0-9]+)*$/;
export const SECRET_LENGTH = 2;

export const SIZE_OF_ENTRY_PAGE = 24;

export const ENTRY_TYPE = {
    CREATED: 'created',
    ENTRY: 'entry'
};

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
