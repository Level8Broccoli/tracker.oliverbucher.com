export const getSecret = (name: string): string | null => {
    const obj = window.localStorage.getItem(name.toLocaleLowerCase());
    if (obj === null) {
        return null;
    }
    try {
        const { secret } = JSON.parse(obj);
        return secret;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const saveSecret = (name: string, secret: string, first = false): void => {
    window.localStorage.setItem(name.toLocaleLowerCase(), JSON.stringify({ secret, first }));
};

export const deleteSecret = (name: string): void => {
    window.localStorage.removeItem(name.toLocaleLowerCase());
};

export const isFirst = (name: string): boolean => {
    const obj = window.localStorage.getItem(name.toLocaleLowerCase());
    if (obj === null) {
        return false;
    }
    try {
        const { first } = JSON.parse(obj);
        return first;
    } catch (error) {
        console.error(error);
        return false;
    }
};
