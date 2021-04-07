import Head from 'next/head';

// Function using fetch to POST to our API endpoint
function createTrack(data: any) {
    return fetch('/.netlify/functions/track-create', {
        body: JSON.stringify(data),
        method: 'POST'
    }).then((response) => {
        return response.json();
    });
}

// Todo data
const myTrack = {
    title: 'My todo title',
    completed: false
};

// create it!
createTrack(myTrack)
    .then((response) => {
        console.log('API response', response);
        // set app state
    })
    .catch((error) => {
        console.log('API error', error);
    });

export default function Home(): JSX.Element {
    return (
        <div>
            <Head>
                <title>Tracker</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>tracker.oliverbucher.com</main>
        </div>
    );
}
