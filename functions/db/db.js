import { Client, Time } from 'faunadb';

export const db = new Client({
    secret: process.env.FAUNADB_SECRET
});

export const toTimeEntity = (timestamp) => Time(timestamp);
