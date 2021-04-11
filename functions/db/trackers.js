import {
    Casefold,
    Collection,
    Create,
    CreateCollection,
    CreateIndex,
    Index,
    Match,
    Paginate
} from 'faunadb';
import {
    ALL_TRACKER_NAMES_INDEX,
    CONFIGS_COLLECTION,
    ENTRY_TYPE,
    INDEX_SUFFIX
} from '../utils/config';
import { getRandomSecret } from '../utils/secret';
import { db, toTimeEntity } from './db';
import { addEntry } from './entries';

const createConfigEntry = async (name, timestamp) => {
    const secret = getRandomSecret();
    const ts = toTimeEntity(timestamp);

    await db.query(
        Create(Collection(CONFIGS_COLLECTION), {
            data: {
                name: Casefold(name),
                secret: Casefold(secret),
                ts
            }
        })
    );
    return secret;
};

const createCollection = async (name) => {
    return await db.query(CreateCollection({ name: Casefold(name) }));
};

const createIndex = async (name, source) => {
    return await db.query(
        CreateIndex({
            name: Casefold(`${name}${INDEX_SUFFIX}`),
            unique: false,
            serialized: true,
            source
        })
    );
};

export const createTracker = async (name, timestamp) => {
    const secret = await createConfigEntry(name, timestamp);
    const { ref } = await createCollection(name);
    await createIndex(name, ref);
    await addEntry(name, timestamp, ENTRY_TYPE.CREATED);

    return secret;
};

export const deleteTracker = async (name) => {
    return {
        name,
        secret: 'secret'
    };
};

export const nameAlreadyExists = async (name) => {
    const { data } = await db.query(
        Paginate(Match(Index(ALL_TRACKER_NAMES_INDEX), Casefold(name)))
    );
    return data.length > 0;
};
