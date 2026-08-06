const jobs = require("../data/jobs");
const Job = require("../models/Job");
const AppError = require("../utils/AppError");

const getAllJobs = async (req , res , next) => {
    try{ 
      const jobs = await Job.find();
      res.status(200).json(jobs);
    }
    catch(err){
        next(err);
    }
}

const getJobById = async (req,res,next) => {
    try{ 
    const job = await Job.findById(req.params.jobId);
    if(!job){
        return next(new AppError("Job not found" , 404));
    }
    res.status(200).json(job);
}

catch(err){
    next(err);
}

}

const createJob = async (req , res , next) => {
    try{
   const newJob = await Job.create(req.body);
   res.status(201).json(newJob);
}
 catch(err){
    next(err);
 }
}

const updateJob = async (req , res , next) => {
    try{   
    const updatedJob = await Job.findByIdAndUpdate(
        req.params.jobId,
        req.body,
        {
            new : true,
            runValidators : true
        }

    );
     if (!updatedJob) {
            return next(new AppError("Job not found" , 404));
        }

        res.status(200).json(updatedJob); 
}
catch(err){
    next(err);
}
}

const deleteJob = async (req, res, next) => {

    try {

        const deletedJob = await Job.findByIdAndDelete(
            req.params.jobId
        );

        if (!deletedJob) {
            return next(new AppError("Job not found" , 404));
        }

        return res.status(200).json(deletedJob);

    }

    catch (err) {
        next(err);
    }

};

module.exports = {
    getAllJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob
}