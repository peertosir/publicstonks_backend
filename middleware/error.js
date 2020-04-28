const ErrorResponse = require('../shared/errors/errorResponse');

const errorHandler = (error, req, res, next) => {

    let returnError = {
        ...error
    };
    returnError.message = error.message;
    console.log(error.red);

    //bad objId
    if (error.name == 'CastError') {
        returnError = new ErrorResponse(`Resource with id ${error.value} not found`, 404);
    }

    //Duplicate key error
    if (error.code === 11000) {
        returnError = new ErrorResponse(`Duplicate field found`, 400);
    }

    res.status(returnError.statusCode || 500).json({
        success: false,
        error: returnError.message || "Internal server error"
    });
}

module.exports = errorHandler;