const HR = require("../models/HR");
const AppError = require("../utils/AppError");

const createHR = async (req, res, next) => {
    try {
        const newHR = await HR.create(req.body);

        res.status(201).json({
            success: true,
            data: newHR,
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
        const updatedHR = await HR.findByIdAndUpdate(
            req.params.hrId,
            req.body,
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
    getAllHRs,
    getHRById,
    updateHR,
    deleteHR,
};