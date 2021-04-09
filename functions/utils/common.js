export const getHeaders = () => {
    if (process.env.LOCAL) {
        return {
            'access-control-allow-origin': '*'
        };
    }
    return undefined;
};

export const returnError = ({ msg, internalCode, statusCode = 400 }) => {
    return {
        statusCode: statusCode,
        body: JSON.stringify({ msg, internalCode }),
        headers: getHeaders()
    };
};

export const returnMethodNotAllowed = () => {
    return {
        statusCode: 405,
        body: JSON.stringify('Method Not Allowed'),
        headers: getHeaders()
    };
};
