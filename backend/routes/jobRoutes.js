const express = require("express");
const router = express.Router();

 const jobs = require("../data/jobs.js");

 const jobController = require("../controllers/jobController");

 const validateJob = require("../middlewares/validateJob");
 
router.get("/",jobController.getAllJobs);

router.get("/:jobId",jobController.getJobById);

router.post("/", validateJob , jobController.createJob);

router.put("/:jobId", jobController.updateJob);

router.delete("/:jobId" , jobController.deleteJob);

module.exports = router;