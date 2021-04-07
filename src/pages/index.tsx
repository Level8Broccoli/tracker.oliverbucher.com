import Head from 'next/head';
import faunadb, { query } from 'faunadb';

const {
    Ref,
    Paginate,
    Get,
    Match,
    Select,
    Index,
    Create,
    Collection,
    Join,
    Call,
    Function: Fn
} = query;

export default function Home(): JSX.Element {
    const client = new faunadb.Client({ secret: process.env.NEXT_PUBLIC_FAUNADB_SECRET || '' });

    const createTracker = async () => {
        const res = await client.query(Create(Collection('track'), { data: { id: 2 } }));
        await console.log(res);
    };

    return (
        <div>
            <Head>
                <title>Tracker</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>tracker.oliverbucher.com</main>
            <button onClick={createTracker}>Einen neuen Tracker erstellen</button>
        </div>
    );
}
