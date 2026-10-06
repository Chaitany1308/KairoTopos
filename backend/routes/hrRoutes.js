const express = require("express");
const protect = require("../middlewares/authMiddleware");

const {
    createHR,
    loginHR,
    getAllHRs,
    getHRById,
    updateHR,
    deleteHR,
    verifyEmail,
} = require("../controllers/hrController");

const router = express.Router();

router.post("/", createHR);
router.get("/", protect, getAllHRs);
router.post("/login", loginHR);
router.get("/:hrId", getHRById);
router.put("/:hrId", updateHR);
router.delete("/:hrId", deleteHR);
router.get("/verify-email/:token", verifyEmail);

module.exports = router;