const Company = require("../models/Company");
const AppError = require("../utils/AppError");

const createCompany = async (req, res, next) => {
    try {
        const newCompany = await Company.create(req.body);

        res.status(201).json({
            success: true,
            data: newCompany,
        });

    } catch (err) {
        next(err);
    }
};

const getAllCompanies = async (req, res, next) => {
    try {
        const companies = await Company.find();

        res.status(200).json({
            success: true,
            data: companies,
        });

    } catch (err) {
        next(err);
    }
};

const getCompanyById = async (req, res, next) => {
    try {
        const company = await Company.findById(req.params.companyId);

        if (!company) {
            return next(new AppError("Company not found", 404));
        }

        res.status(200).json({
            success: true,
            data: company,
        });

    } catch (err) {
        next(err);
    }
};

const updateCompany = async (req, res, next) => {
    try {
        const updatedCompany = await Company.findByIdAndUpdate(
            req.params.companyId,
            req.body,
            { new: true }
        );

        if (!updatedCompany) {
            return next(new AppError("Company not found", 404));
        }

        res.status(200).json({
            success: true,
            data: updatedCompany,
        });

    } catch (err) {
        next(err);
    }
};

const deleteCompany = async (req, res, next) => {
    try {
        const deletedCompany = await Company.findByIdAndDelete(
            req.params.companyId
        );

        if (!deletedCompany) {
            return next(new AppError("Company not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "Company deleted successfully",
        });

    } catch (err) {
        next(err);
    }
};

module.exports = {
    createCompany,
    getAllCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany,
};