// routes/employeeRoutes.js
const express = require("express");
const {
  registerEmployeeBadge,
  showEntireEmployeeRoster,
  pullEmployeeCardById,
  reviseEmployeeBadgeById,
  discardEmployeeRecord,
  filterEmployeesDirectory,
} = require("../controllers/employeeController");

const handlePhotoDropOff = require("../middleware/uploadEmployeeImage");

// This is the custom router instance for all employee-related actions
const employeePathway = express.Router();

// This will create a fresh employee badge (with optional profile image)
employeePathway.post(
  "/",
  handlePhotoDropOff.single("profileImage"),
  registerEmployeeBadge
);

// Retrieve everyone currently registered in the system
employeePathway.get("/", showEntireEmployeeRoster);

// Dynamic filtering based on department or position
employeePathway.get("/search", filterEmployeesDirectory);

// Inspect a single employee badge in detail
employeePathway.get("/:id", pullEmployeeCardById);

// Revise an existing employee badge (photo can be updated too)
employeePathway.put(
  "/:id",
  handlePhotoDropOff.single("profileImage"),
  reviseEmployeeBadgeById
);

// Remove an employee card from the system entirely
employeePathway.delete("/:id", discardEmployeeRecord);

module.exports = employeePathway;
