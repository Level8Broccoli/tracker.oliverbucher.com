import { DateTime } from 'luxon';

export interface entryModel {
    timestamp: DateTime;
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
