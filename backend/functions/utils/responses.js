const getHeaders = (additionalHeaders = undefined) => {
    if (process.env.LOCAL) {
        return {
            'access-control-allow-origin': '*',
            ...additionalHeaders
        };
    }
    return additionalHeaders;
};

export const ok = (body, additionalHeaders) => {
    return {
        statusCode: 200,
        body: JSON.stringify(body),
        headers: getHeaders(additionalHeaders)
    };
};

export const created = (body, additionalHeaders) => {
    return {
        statusCode: 201,
        body: JSON.stringify(body),
        headers: getHeaders(additionalHeaders)
    };
};

export const methodNotAllowed = (additionalHeaders) => {
    return {
        statusCode: 405,
        body: JSON.stringify('Method Not Allowed'),
        headers: getHeaders(additionalHeaders)
    };
};

export const badRequest = (additionalHeaders) => {
    return {
        statusCode: 400,
        body: JSON.stringify('Bad Request'),
        headers: getHeaders(additionalHeaders)
    };
};

export const noContent = (additionalHeaders) => {
    return {
        statusCode: 204,
        headers: getHeaders(additionalHeaders)
    };
};

export const serverError = (body, additionalHeaders) => {
    return {
        statusCode: 500,
        body: JSON.stringify(body),
        headers: getHeaders(additionalHeaders)
    };
};
