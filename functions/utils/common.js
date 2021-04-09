export const getHeaders = () => {
    if (process.env.LOCAL) {
        return {
            'access-control-allow-origin': '*'
        };
    }
    return undefined;
};

export const returnError = (e) => {
    return {
        statusCode: 400,
        body: JSON.stringify(e)
    };
};

export const returnMethodNotAllowed = () => {
    return {
        statusCode: 405,
        body: JSON.stringify('Method Not Allowed')
    };
};
