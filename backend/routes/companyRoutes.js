const express = require("express");

const {
    createCompany,
    getAllCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany,
} = require("../controllers/companyController");

const router = express.Router();

router.post("/", createCompany);

router.get("/", getAllCompanies);

router.get("/:companyId", getCompanyById);

router.put("/:companyId", updateCompany);

router.delete("/:companyId", deleteCompany);

module.exports = router;