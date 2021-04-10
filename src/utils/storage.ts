export const getSecret = (): string | null => {
    return window.localStorage.getItem('secret');
};

export const saveSecret = (secret: string): void => {
    window.localStorage.setItem('secret', secret);
};
