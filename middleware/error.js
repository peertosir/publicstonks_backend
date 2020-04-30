const ErrorResponse = require('../shared/errors/errorResponse');

const errorHandler = (error, req, res, next) => {
    let returnError = {
        ...error
    };

    returnError.message = error.message;

    //wrong objId
    if (error.name == 'CastError') {
        returnError = new ErrorResponse(`Resource with id ${error.value} not found`, 404);
    }

    //Duplicate key error
    if (error.code === 11000) {
        returnError = new ErrorResponse(`Duplicate field found`, 400);
    }

    //Mongoose validation
    if (error.name == "ValidationError") {
        const message = Object.values(error.errors).map(err => err.message).join('; ');
        returnError = new ErrorResponse(message, 400);
    }

    res.status(returnError.statusCode || 500).json({
        success: false,
        error: returnError.message || "Internal server error"
    });
}

module.exports = errorHandler;