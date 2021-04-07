import faunadb, { query } from 'faunadb';
const { Create, Collection } = query;

const FAUNADB_SECRET = 'fnAEGOUMcZACB3ni6zD_KxazWyeuiBksZQR3IYV8';

const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET || FAUNADB_SECRET
});

console.log(process.env.FAUNADB_SECRET);
export async function handler(event) {
    try {
        const data = JSON.parse(event.body);
        const res = await client.query(Create(Collection('tracks'), { data }));

        return {
            statusCode: 200,
            body: JSON.stringify({ res, method: event.httpMethod })
        };
    } catch (e) {
        return {
            statusCode: 400,
            body: JSON.stringify(e)
        };
    }
}
