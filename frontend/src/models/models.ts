import { DateTime } from 'luxon';

export type entryType = 'created' | 'entry';

export interface entryModel {
    timestamp: DateTime;
    type: entryType;
    ref: number;
}

export interface entryCreateModel {
    data: { entry: entryModel };
    code: number;
}

export interface listOfEntries {
    data: entryModel[];
    count: number;
    next?: number;
    created: DateTime;
}

export interface entryReadAllModel {
    data: listOfEntries;
    code: number;
}
