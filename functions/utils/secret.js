import { SECRET_LENGTH, SECRET_RULE } from './config';

const wordList = [
    'Okay',
    'Stress',
    'Eule',
    'Hilfe',
    'Suppe',
    'Iglu',
    'Visier',
    'Reporter',
    'Sirup',
    'Schleifen',
    'Sockel',
    'Pilger',
    'Kredit',
    'Flugzeug',
    'Gitter',
    'Kobra',
    'Oben',
    'Cool',
    'Speer',
    'Anwalt',
    'Pasta',
    'Stadion',
    'Hund',
    'Rennen',
    'Gesang'
];

export const getRandomSecret = () => {
    const randomNumbers = new Set();
    if (wordList.length < SECRET_LENGTH) {
        throw 'Wordlist is too small to generate a secret!';
    }
    while (randomNumbers.size < SECRET_LENGTH) {
        const randomIndex = Math.floor(Math.random() * wordList.length);
        randomNumbers.add(randomIndex);
    }

    const secret = Array.from(randomNumbers)
        .map((num) => wordList[num])
        .join(' ');

    if (!SECRET_RULE.test(secret)) {
        throw 'Error happend while generating the secret.';
    }

    return secret;
};
