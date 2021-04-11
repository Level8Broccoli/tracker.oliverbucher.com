type entryType = 'created' | 'entry';

export interface entry {
    timestamp: Date;
    type: entryType;
}

export interface errorResponse {
    data: { msg: string };
    code: number;
}

export interface authResponse {
    data: { secretVerified: boolean };
    code: number;
}

export interface trackerCreateResponse {
    data: { secret: string };
    code: number;
}

interface configEntry {
    name: string;
    secret: string;
    timestamp: string;
}

export interface trackerDeleteResponse {
    data: { data: configEntry };
    code: number;
}
