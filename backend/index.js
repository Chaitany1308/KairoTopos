// Express file ko import kar rhe hai node_modulus se require ka use karkar and const
// means ki express constant reference de diya ab express or kisi k liye use nhi hoga.
const express = require("express");  

// imported express ka application create kar rhe hai
// till now, we have imported express from node_modulus, now we have made our SmartHire app
const app = express();  

app.use(express.json());

 const jobs = [
    {
        id : 1,
        title : "Software Engineer",
        company : "Google",
        location : "Hyderabad"
    },

    {
        id: 2,
        title: "Frontend Developer",
        company: "Amazon",
        location : "Bengaluru"
    }
   ]


app.get("/", (req,res)=>{
    res.send("Welcome to SmartHire Backend!");
});

app.listen(5000 , ()=> {
    console.log("SmartHire Backend Running...");
});

app.get("/health" , (req,res)=>{
    res.send("Server is healthy");
});

app.get("/about",(req,res)=>{
    res.send("You will know everything about me here...!!!!");
});

app.get("/profile",(req,res)=>{
    res.send("Candidate profile");
});

app.get("/hr",(req,res)=>{
    res.send("HR Dashboard");
});

app.get("/jobs",(req,res)=>{
   
    res.json(jobs);
});

app.get("/jobs/:jobId",(req,res)=>{
      const jobs = [
    {
        id : 1,
        title : "Software Engineer",
        company : "Google"
    },

    {
        id: 2,
        title: "Frontend Developer",
        company: "Amazon"
    }
   ]
    const job = jobs.find((job) => job.id == req.params.jobId);
    
    if(!job){
         return res.status(404).json({
            message : "Job not found"
        });
    }

    res.json(job);
});

app.post("/jobs", (req,res) =>{
       
     console.log(req.body);
      
     if(!req.body.title){
        return res.status(400).json({
         message:"Job Title Required"
        });
     }

     if(!req.body.company){
        return res.status(400).json({
            message: "Company Name Required"
        });
     }

     if(!req.body.location){
         return res.status(400).json({
            message: "Location is Required"
         });
     }

     const newJob = {
        id: jobs.length + 1,
        title: req.body.title,
        company: req.body.company,
        location: req.body.location
     };

      jobs.push(newJob);

     res.json({
        message : "Job created successfully"
     });
});

app.put("/jobs/:jobId", (req,res)=>{

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
})

app.delete("/jobs/:jobId" , (req,res)=>{
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
});