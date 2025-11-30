// controllers/employeeController.js
const EmployeeProfileRecord = require("../models/Employee");

// Create a brand-new employee entry
const registerEmployeeBadge = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      position,
      department,
      salary
    } = req.body;

    // Basic validation
    if (!first_name || !last_name || !email || !position || !department) {
      return res.status(400).json({
        details: "You are still missing key employee information."
      });
    }

    // Check if the employee already exists
    const duplicate = await EmployeeProfileRecord.findOne({ email });
    if (duplicate) {
      return res.status(409).json({
        details: "An employee profile with this email already exists."
      });
    }

    // Handle profile image
    let storedPhotoPath;
    if (req.file) {
      storedPhotoPath = `/uploads/${req.file.filename}`;
    }

    // Create new employee record
    const newBadge = await EmployeeProfileRecord.create({
      first_name,
      last_name,
      email,
      position,
      department,
      salary,
      profileImage: storedPhotoPath
    });

    return res.status(201).json(newBadge);
  } catch (error) {
    console.error("registerEmployeeBadge:", error.message);
    return res.status(500).json({
      details: "We are currently experiencing some server trouble while adding this employee."
    });
  }
};

// Fetch every employee in the system
const showEntireEmployeeRoster = async (req, res) => {
  try {
    const roster = await EmployeeProfileRecord.find();
    return res.json(roster);
  } catch (error) {
    console.error("showEntireEmployeeRoster:", error.message);
    return res.status(500).json({
      details: "Sorry at this time we are unable to load employee list at the moment."
    });
  }
};

// Get a specific employee by ID
const pullEmployeeCardById = async (req, res) => {
  try {
    const target = await EmployeeProfileRecord.findById(req.params.id);
    if (!target) {
      return res.status(404).json({
        details: "The requested employee record was not able to be located at this time."
      });
    }
    return res.json(target);
  } catch (error) {
    console.error("pullEmployeeCardById:", error.message);
    return res.status(500).json({
      details: "System has an issue while trying to search for this employee."
    });
  }
};

// Update any field on an employee card
const reviseEmployeeBadgeById = async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      position,
      department,
      salary
    } = req.body;

    const revisionPacket = {
      first_name,
      last_name,
      email,
      position,
      department,
      salary
    };

    // Photo update if attached
    if (req.file) {
      revisionPacket.profileImage = `/uploads/${req.file.filename}`;
    }

    const updatedBadge = await EmployeeProfileRecord.findByIdAndUpdate(
      req.params.id,
      revisionPacket,
      { new: true, runValidators: true }
    );

    if (!updatedBadge) {
      return res.status(404).json({
        details: "Unable to update; employee profile not located."
      });
    }

    return res.json(updatedBadge);
  } catch (error) {
    console.error("reviseEmployeeBadgeById:", error.message);
    return res.status(500).json({
      details: "Server error occurred while modifying employee details."
    });
  }
};

// Remove employee permanently
const discardEmployeeRecord = async (req, res) => {
  try {
    const removed = await EmployeeProfileRecord.findByIdAndDelete(
      req.params.id
    );

    if (!removed) {
      return res.status(404).json({
        details: "Record you attempted to delete does not exist."
      });
    }

    return res.json({
      details: "Employee profile successfully removed from system."
    });
  } catch (error) {
    console.error("discardEmployeeRecord:", error.message);
    return res.status(500).json({
      details: "Problem encountered while deleting employee record."
    });
  }
};

// Filter employees by optional department & position
const filterEmployeesDirectory = async (req, res) => {
  try {
    const { department, position } = req.query;

    const criteria = {};
    if (department) criteria.department = department;
    if (position) criteria.position = position;

    const results = await EmployeeProfileRecord.find(criteria);
    return res.json(results);
  } catch (error) {
    console.error("filterEmployeesDirectory:", error.message);
    return res.status(500).json({
      details: "Employee filtering failed due to server issues."
    });
  }
};

module.exports = {
  registerEmployeeBadge,
  showEntireEmployeeRoster,
  pullEmployeeCardById,
  reviseEmployeeBadgeById,
  discardEmployeeRecord,
  filterEmployeesDirectory
};
