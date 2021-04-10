type entryType = 'created' | 'entry';

export interface entry {
    timestamp: Date;
    type: entryType;
}
