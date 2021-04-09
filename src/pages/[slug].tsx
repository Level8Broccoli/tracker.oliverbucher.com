import { useRouter } from 'next/router';

export default function Tracker(): JSX.Element {
    const router = useRouter();
    const { slug } = router.query;

    return <p>Name: {slug}</p>;
}
