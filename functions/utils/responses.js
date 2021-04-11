const getHeaders = (additionalHeaders = undefined) => {
    if (process.env.LOCAL) {
        return {
            'access-control-allow-origin': '*',
            ...additionalHeaders
        };
    }
    return additionalHeaders;
};

export const ok = (body) => {
    return {
        statusCode: 200,
        body: JSON.stringify(body),
        headers: getHeaders()
    };
};

export const methodNotAllowed = () => {
    return {
        statusCode: 405,
        body: JSON.stringify('Method Not Allowed'),
        headers: getHeaders()
    };
};

export const badRequest = () => {
    return {
        statusCode: 400,
        body: JSON.stringify('Bad Request'),
        headers: getHeaders()
    };
};

export const serverError = (body) => {
    return {
        statusCode: 500,
        body: JSON.stringify(body),
        headers: getHeaders()
    };
};
