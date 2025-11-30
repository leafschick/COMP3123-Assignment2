// middleware/uploadEmployeeImage.js
const multer = require("multer");
const path = require("path");

// Custom storage engine for employee photo uploads
const organizeEmployeePhotoStorage = multer.diskStorage({
  destination: function (req, file, callbackFunction) {
    // save inside uploads folder
    callbackFunction(null, "uploads/");
  },
  filename: function (req, file, callbackFunction) {
    // unique filename with timestamp
    const renamedPhotoFile =
      "emp_" + Date.now() + "_" + file.originalname.replace(/\s+/g, "_");
    callbackFunction(null, renamedPhotoFile);
  },
});

// Image verification filter
const verifyEmployeePhotoType = (req, file, callbackFunction) => {
  if (file.mimetype && file.mimetype.startsWith("image/")) {
    callbackFunction(null, true);
  } else {
    callbackFunction(
      new Error("Sorry, only image-type files can be uploaded for employees."),
      false
    );
  }
};

// Initialize the multer middleware with our custom config
const handleEmployeePhotoUpload = multer({
  storage: organizeEmployeePhotoStorage,
  fileFilter: verifyEmployeePhotoType,
});

// Export the customized upload handler
module.exports = handleEmployeePhotoUpload;
