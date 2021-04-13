import { DateTime } from 'luxon';

export type entryType = 'created' | 'entry';

export interface entryModel {
    timestamp: DateTime;
    type: entryType;
}

export interface entryCreateModel {
    data: { entry: entryModel };
    code: number;
}

export interface entryReadAllModel {
    data: { data: entryModel[] };
    code: number;
}
