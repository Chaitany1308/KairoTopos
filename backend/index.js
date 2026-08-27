// Express file ko import kar rhe hai node_modulus se require ka use karkar and const
// means ki express constant reference de diya ab express or kisi k liye use nhi hoga.
const express = require("express");  

// imported express ka application create kar rhe hai
// till now, we have imported express from node_modulus, now we have made our KairoTopos app
const app = express();  

const jobRouter = require("./routes/jobRoutes");

const companyRoutes = require("./routes/companyRoutes");

const hrRoutes = require("./routes/hrRoutes");

const connectDB = require("./config/db");

require("dotenv").config();

const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());

app.use("/jobs", jobRouter);

app.use("/companies", companyRoutes);

app.use("/hr", hrRoutes);

app.get("/", (req,res)=>{
    res.send("Welcome to KairoTopos Backend!");
});

app.use(errorHandler);

connectDB();

app.listen(process.env.PORT , ()=> {
    console.log("KairoTopos Backend Running...");
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

