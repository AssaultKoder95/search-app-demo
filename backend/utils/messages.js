module.exports.errors = {
    400: {
        message: 'Your request is missing parameters / contains invalid parameters.',
    },
    401: {
        message: 'You are unauthorized to perform this action.',
    },
    403: {
        message: 'You are forbidden to perform this action.',
    },
    404: {
        message: 'We could not find the requested resource.',
    },
    429: {
        message: 'The rate limits for the requested endpoint has been exceeded.',
    },
    500: {
        message: 'We have experienced an internal error while processing your request.',
    },
};

module.exports.ERR_MESSAGES = { }