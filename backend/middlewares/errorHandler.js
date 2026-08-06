const errorHandler = (err, req, res, next) => {

    console.log(err);

    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    if (err.name === "ValidationError") {
        statusCode = 400;
    }

    if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid Job Id";
    }

    return res.status(statusCode).json({
        success: false,
        message
    });

};

module.exports = errorHandler;