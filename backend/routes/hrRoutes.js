const express = require("express");

const {
    createHR,
    getAllHRs,
    getHRById,
    updateHR,
    deleteHR,
} = require("../controllers/hrController");

const router = express.Router();

router.post("/", createHR);
router.get("/", getAllHRs);
router.get("/:hrId", getHRById);
router.put("/:hrId", updateHR);
router.delete("/:hrId", deleteHR);

module.exports = router;