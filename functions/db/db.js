import { Client } from 'faunadb';

export const db = new Client({
    secret: process.env.FAUNADB_SECRET
});
