const express = require("express");
const { protect, restrictTo } = require("../middlewares/authMiddleware");

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
router.get("/", protect, restrictTo("ADMIN"), getAllHRs);
router.post("/login", loginHR);
router.get("/:hrId", protect, getHRById);
router.put("/:hrId", protect, updateHR);
router.delete("/:hrId", protect, restrictTo("ADMIN"), deleteHR);
router.get("/verify-email/:token", verifyEmail);

module.exports = router;