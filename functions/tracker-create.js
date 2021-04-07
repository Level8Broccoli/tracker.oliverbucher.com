import faunadb, { query } from 'faunadb';
const { Create, Collection } = query;

const client = new faunadb.Client({
    secret: process.env.FAUNADB_SECRET
});


export async function handler(event) {
    console.log({ secret: process.env.FAUNADB_SECRET });
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
