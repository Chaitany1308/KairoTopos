const jwt = require("jsonwebtoken");
const AppError = require("../utils/AppError");
const HR = require("../models/HR");
const mongoose = require("mongoose");

const protect = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        // Check if Authorization header exists
        if (!authHeader) {
            return next(
                new AppError("You are not logged in", 401)
            );
        }

        // Check Authorization format
        const parts = authHeader.split(" ");

        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return next(
                new AppError("Invalid authorization format", 401)
            );
        }

        // Get actual JWT
        const token = parts[1];

        // Verify JWT
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        
        if (!decoded.id || !mongoose.Types.ObjectId.isValid(decoded.id)) {
    return next(new AppError("Invalid or expired token", 401));
}

        // Find HR in database
        const hr = await HR.findById(decoded.id);

        // Check if HR still exists
        if (!hr) {
            return next(
                new AppError("User no longer exists", 401)
            );
        }

        // Attach authenticated HR to request
        req.user = hr;
        next();

    } 
    catch (err) {
    if (
        err.name === "JsonWebTokenError" ||
        err.name === "TokenExpiredError"
    ) {
        return next(
            new AppError("Invalid or expired token", 401)
        );
    }

    next(err);
}
};


const restrictTo = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError("You do not have permission", 403)
            );
        }

        next();
    };
};


module.exports = {
    protect,
    restrictTo,
};