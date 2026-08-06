const mongoose = require("mongoose");
const jobSchema = new mongoose.Schema({

  title : {
    type : String,
    required : true
  },

  company : {
    type : String,
    required : true
  },

  location : {
    type : String,
    required : true
  },

  skills : {
    type : [String],
    required : true
  },

  experience : {
    type : String,
    required : true
  },

  salary : {
    type : String,
    required : false
  },

  specialisation : {
    type : [String],
    required : true
  },

  applicationDeadline : {
    type : Date,
    required : true
  },

  status : {
    type : String,
    enum : ["Open" , "Close"],
    default : "Open"
  },

  description : {
   type : String,
   required : true
  }

},
   {
    timestamps : true
   });

   module.exports= mongoose.model("Job", jobSchema);