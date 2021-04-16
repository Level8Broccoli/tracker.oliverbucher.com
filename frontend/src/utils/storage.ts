export const getSecret = (name: string): string | null => {
    return window.localStorage.getItem(name.toLocaleLowerCase());
};

export const saveSecret = (name: string, secret: string): void => {
    window.localStorage.setItem(name.toLocaleLowerCase(), secret);
};

export const deleteSecret = (name: string): void => {
    window.localStorage.removeItem(name.toLocaleLowerCase());
};
