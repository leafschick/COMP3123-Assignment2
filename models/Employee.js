// models/Employee.js
const mongoose = require("mongoose");

// Structure for storing each employee record
const employeeProfileStructure = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
      trim: true,
    },
    last_name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    position: {
      type: String,
      required: true,
      trim: true,
    },
    department: {
      type: String,
      required: true,
      trim: true,
    },
    salary: {
      type: Number,
      default: 0,
    },
    profileImage: {
      type: String, 
    },
    isActiveEmployee: {
      type: Boolean,
      default: true,
    },
    createdOn: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "employees",
  }
);

const EmployeeProfileRecord = mongoose.model(
  "EmployeeProfileRecord",
  employeeProfileStructure
);

module.exports = EmployeeProfileRecord;
