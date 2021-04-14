export const getSecret = (name: string): string | null => {
    return window?.localStorage?.getItem(name);
};

export const saveSecret = (name: string, secret: string): void => {
    window.localStorage.setItem(name, secret);
};

export const deleteSecret = (name: string): void => {
    window.localStorage.removeItem(name);
};
