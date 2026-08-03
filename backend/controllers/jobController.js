const jobs = require("../data/jobs");

const getAllJobs = (req , res , next) => {
    try{ 
    res.json(jobs);
    }
    catch(err){
        next(err);
    }
}

const getJobById = (req,res,next) => {
    try{ 
    const job = jobs.find((job) => job.id == req.params.jobId);

    
    if(!job){
         return res.status(404).json({
            message : "Job not found"
        });
    }

    res.json(job);
}

catch(err){
    next(err);
}

}

const createJob = (req , res , next) => {
    try{
    console.log(req.body);

    const newJob = {
        id: Math.max(...jobs.map(job => job.id)) + 1,
        title: req.body.title,
        company: req.body.company,
        location: req.body.location
    };

    jobs.push(newJob);

    return res.status(201).json(newJob);
}
 catch(err){
    next(err);
 }
}

const updateJob = (req , res , next) => {
    try{   
    const job = jobs.find((job) => {
           return job.id == req.params.jobId;
       });
     
       if (!job) {
    return res.status(404).json({
        message: "Job not found"
    });
  } 
  if(req.body.title){
    job.title = req.body.title;
  }

  if(req.body.location){
    job.location = req.body.location;
  }

  if(req.body.company){
    job.company = req.body.company;
  }

  res.json({
     message: "Job updated successfully",
     job: job
  });  
}
catch(err){
    next(err);
}
}

const deleteJob = (req , res , next) => {
    try{
    const index = jobs.findIndex((job)=>{
             return job.id == req.params.jobId;
         });
     
         if(index== -1){
             return res.status(404).json({
                 message : "Job not found"
             });
         }
     
         jobs.splice(index,1);
         console.log(jobs);
     
         res.json({
             message : "Job deleted successfully"
         });
        }
        catch(err){
            next(err);
        }
}

module.exports = {
    getAllJobs,
    getJobById,
    createJob,
    updateJob,
    deleteJob
}