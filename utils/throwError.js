const ERRORMESSAGE = 'Error inesperado, por favor contacte a su administrador';

const TBadRequest = (message) => {
    return { statusCode: 400, message };
}

const TNotFound = (message) => {
    return { statusCode: 404, message };
}

const TError = (message) => {
    return { statusCode: 500, message: message || ERRORMESSAGE };
}

module.exports = { TBadRequest, TNotFound, TError };