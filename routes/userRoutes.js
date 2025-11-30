// routes/userRoutes.js
const express = require("express");
const {
  createNewUserAccount,
  loginExistingUser,
} = require("../controllers/userController");

const router = express.Router();

// Signup
router.post("/signup", createNewUserAccount);

// Login
router.post("/login", loginExistingUser);

module.exports = router;
