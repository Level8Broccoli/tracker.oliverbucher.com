import { entryType } from '../models/models';

export interface entryAPI {
    timestamp: string;
    type: entryType;
}

export interface errorResponseAPI {
    data: { msg: string };
    code: number;
}

export interface authResponseAPI {
    data: { secretVerified: boolean };
    code: number;
}

export interface trackerCreateAPI {
    data: { secret: string };
    code: number;
}

interface configEntryAPI {
    name: string;
    secret: string;
    timestamp: string;
}

export interface trackerDeleteAPI {
    data: { data: configEntryAPI };
    code: number;
}

export interface entryCreateAPI {
    data: { entry: entryAPI };
    code: number;
}

export interface entryReadAllAPI {
    data: { data: entryAPI[] };
    code: number;
}
