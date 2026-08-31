const HR = require("../models/HR");
const AppError = require("../utils/AppError");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createHR = async (req, res, next) => {
    try {
         const existingHR = await HR.findOne({
            email: req.body.email
        });

        if (existingHR) {
            return next(new AppError("HR already exists", 409));
        }
        const newHR = await HR.create(req.body);

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
            return next(new AppError("Invalid email or password", 401));
        }

        const isPasswordCorrect = await bcrypt.compare(
            password,
            hr.password
        );

        if (!isPasswordCorrect) {
            return next(new AppError("Invalid email or password", 401));
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
            token : token
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
        const updateData = { ...req.body };

        if (updateData.password) {
            updateData.password = await bcrypt.hash(updateData.password, 10);
        }

        const updatedHR = await HR.findByIdAndUpdate(
            req.params.hrId,
            updateData,
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

module.exports = {
    createHR,
    loginHR,
    getAllHRs,
    getHRById,
    updateHR,
    deleteHR,
};