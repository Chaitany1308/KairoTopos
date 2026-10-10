const HR = require("../models/HR");
const AppError = require("../utils/AppError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const mongoose = require("mongoose");

const createHR = async (req, res, next) => {
    try {
         const existingHR = await HR.findOne({
            email: req.body.email
        });

        if (existingHR) {
            return next(new AppError("HR already exists", 409));
        }
        const verificationToken = crypto.randomBytes(32).toString("hex");
        const verificationTokenExpires = new Date(
    Date.now() + 24 * 60 * 60 * 1000
);
      const newHR = await HR.create({
    ...req.body,
    role: "HR",
    verificationToken,
    verificationTokenExpires
});

        res.status(201).json({
            success: true,
            data: newHR,
        });

    } catch (err) {
        next(err);
    }
};

const loginHR = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const hr = await HR.findOne({ email }).select("+password");

        if (!hr) {
            return next(
                new AppError("Invalid email or password", 401)
            );
        }

        if (!hr.isEmailVerified) {
            return next(
                new AppError(
                    "Please verify your email before logging in",
                    401
                )
            );
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            hr.password
        );

        if (!isPasswordCorrect) {
            return next(
                new AppError("Invalid email or password", 401)
            );
        }

        const token = jwt.sign(
            {
                id: hr._id,
                role: hr.role,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        res.status(200).json({
            success: true,
            message: "Login successful",
            token: token,
        });

    } catch (err) {
        next(err);
    }
};


const getAllHRs = async (req, res, next) => {
    try {
        const hrs = await HR.find();

        res.status(200).json({
            success: true,
            data: hrs,
        });

    } catch (err) {
        next(err);
    }
};

const getHRById = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.hrId)) {
    return next(new AppError("Invalid HR ID", 400));
}
        if (
    req.user.role !== "ADMIN" &&
    req.user._id.toString() !== req.params.hrId
) {
    return next(
        new AppError("You can only access your own profile", 403)
    );
}
        const hr = await HR.findById(req.params.hrId);

        if (!hr) {
            return next(new AppError("HR not found", 404));
        }

        res.status(200).json({
            success: true,
            data: hr,
        });

    } catch (err) {
        next(err);
    }
};


const updateHR = async (req, res, next) => {
    try {
        if (!mongoose.Types.ObjectId.isValid(req.params.hrId)) {
    return next(new AppError("Invalid HR ID", 400));
}
        // Step 1: Check ownership or ADMIN permission
        if (
            req.user.role !== "ADMIN" &&
            req.user._id.toString() !== req.params.hrId
        ) {
            return next(
                new AppError(
                    "You can only update your own profile",
                    403
                )
            );
        }

        // Step 2: Allow only approved profile fields
        const allowedFields = ["name", "designation", "company"];
        const updateData = {};

        for (const field of allowedFields) {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        }

        // Step 3: Reject requests with no permitted fields
        if (Object.keys(updateData).length === 0) {
            return next(
                new AppError(
                    "No valid profile fields provided",
                    400
                )
            );
        }

        // Step 4: Update the HR document
        const updatedHR = await HR.findByIdAndUpdate(
            req.params.hrId,
            { $set: updateData },
            {
                new: true,
                runValidators: true,
            }
        );

        if (!updatedHR) {
            return next(new AppError("HR not found", 404));
        }

        res.status(200).json({
            success: true,
            data: updatedHR,
        });

    } catch (err) {
        next(err);
    }
};

const deleteHR = async (req, res, next) => {
    try {
          if (!mongoose.Types.ObjectId.isValid(req.params.hrId)) {
            return next(new AppError("Invalid HR ID", 400));
        }
        const deletedHR = await HR.findByIdAndDelete(
            req.params.hrId
        );

        if (!deletedHR) {
            return next(new AppError("HR not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "HR deleted successfully",
        });

    } catch (err) {
        next(err);
    }
};

const verifyEmail = async (req, res, next) => {
    try {
     
      const hr = await HR.findOne({
    verificationToken: req.params.token
});

if (!hr) {
    return next(new AppError("Invalid verification token", 404));
}

if (Date.now() > hr.verificationTokenExpires) {
    return next(
        new AppError("Verification token has expired", 400)
    );
}
hr.isEmailVerified = true;
hr.verificationToken = null;
hr.verificationTokenExpires = null;

await hr.save();
res.status(200).json({
    success: true,
    message: "Email verification successful",
});

    } catch (err) {
        next(err);
    }
};

module.exports = {
    createHR,
    loginHR,
    getAllHRs,
    getHRById,
    updateHR,
    deleteHR,
    verifyEmail,
};