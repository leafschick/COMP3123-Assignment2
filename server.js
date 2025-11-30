// server.js
const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const launchMongoConnection = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const employeePathway = require("./routes/employeeRoutes");

dotenv.config();

const app = express();

// Allow JSON body parsing
app.use(express.json());

// Serve any saved employee photos from the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Start Mongo connection
launchMongoConnection();

// Simple health-check route
app.get("/", (req, res) => {
  res.send("Assignment backend is up and listening.");
});

// User account routes (signup + login)
app.use("/api/users", userRoutes);

// Employee-related routes (CRUD + search + photo upload)
app.use("/api/employees", employeePathway);

// Boot up the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend service is running on port ${PORT}`);
});
