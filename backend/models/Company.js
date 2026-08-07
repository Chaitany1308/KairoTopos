const mongoose = require("mongoose");

const companySchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 250,
    },

    website: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    logo: {
      type: String,
      trim: true,
    },

    industry: {
      type: String,
      required: true,
      enum: [
        "IT",
        "Finance",
        "Healthcare",
        "EdTech",
        "E-commerce",
        "Manufacturing",
        "Telecommunication",
        "Consulting",
      ],
    },

    companyType: {
      type: String,
      required: true,
      enum: [
        "Startup",
        "Private",
        "Public",
        "MNC",
        "Government",
      ],
    },

    employeeSize: {
      type: String,
      required: true,
      enum: [
        "1-10",
        "11-50",
        "51-200",
        "201-500",
        "501-1000",
        "1000+",
      ],
    },

    location: {
      city: {
        type: String,
        required: true,
        trim: true,
      },

      state: {
        type: String,
        required: true,
        trim: true,
      },

      country: {
        type: String,
        required: true,
        trim: true,
      },
    },

    registrationNumber: {
      type: String,
      unique: true,
      trim: true,
    },
   verificationStatus: {
    type: String,
    enum: [
        "Pending",
        "AI Verified",
        "Manually Verified",
        "Rejected"
    ],
    default: "Pending"
},
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Company", companySchema);