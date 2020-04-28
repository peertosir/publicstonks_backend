const ErrorResponse = require('../shared/errors/errorResponse');

const errorHandler = (error, req, res, next) => {

    let returnError = {
        ...error
    };
    returnError.message = error.message;

    if (error.name == 'CastError') {
        returnError = new ErrorResponse(`Resource with id ${error.value} not found`, 404);
    }

    res.status(returnError.statusCode || 500).json({
        success: false,
        error: returnError.message || "Internal server error"
    });
}

module.exports = errorHandler;