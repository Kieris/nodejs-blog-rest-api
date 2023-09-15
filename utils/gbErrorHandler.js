const gbErrorHandler = (err, req, res, next) => {
    const statusCode = err?.statusCode || 500;
    const errorMessage = err?.message || "Something went wrong!";
    const status = err?.status || "failed";
    res.status(statusCode).json({
        status: status,
        message: errorMessage,
        stack: err.stack
    });
};

module.exports = gbErrorHandler;