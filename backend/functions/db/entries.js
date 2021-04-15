import {
    Casefold,
    Collection,
    Create,
    Documents,
    Get,
    Lambda,
    Map as FaunaMap,
    Paginate
} from 'faunadb';
import { db } from './db';

export const addEntry = async (name, timestamp, type) => {
    const { data } = await db.query(
        Create(Collection(Casefold(name)), { data: { timestamp, type: Casefold(type) } })
    );
    return data;
};

export const getAllEntries = async (name) => {
    const { data } = await db.query(
        FaunaMap(
            Paginate(Documents(Collection(Casefold(name)))),
            Lambda((doc) => Get(doc))
        )
    );
    return data.map(({ data }) => data);
};
