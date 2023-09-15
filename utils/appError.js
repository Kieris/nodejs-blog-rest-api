
const appError = (message, statusCode) => {
    let error = new Error(message);
    error.statusCode = statusCode || 504;
    error.stack = error.stack || "Something went wrong!";
    return error;
};

class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = "failed";
    }
}

module.exports = { appError, AppError };