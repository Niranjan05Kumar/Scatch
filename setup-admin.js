// One-time script to set up the admin user
require("dotenv").config();
const mongoose = require("mongoose");
const config = require("config");
const ownerModel = require("./models/owner-model");

// Connect to the database
mongoose.connect(config.get("MONGO_URI"))
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => {
    console.error("Failed to connect to MongoDB", err);
    process.exit(1);
  });

async function createAdmin() {
  try {
    // Check if an owner already exists
    const existingOwners = await ownerModel.find();
    if (existingOwners.length > 0) {
      console.log("An owner already exists in the database. Aborting.");
      process.exit(0);
    }

    // Create the admin owner
    const adminOwner = await ownerModel.create({
      fullname: "Admin User",
      email: "admin@example.com",
      password: "admin123", // In production, use a strong password
    });

    console.log("Admin owner created successfully:", adminOwner);
    console.log("Login credentials:");
    console.log("Email:", adminOwner.email);
    console.log("Password: admin123");
    console.log("\nIMPORTANT: Change this password after first login in a production environment!");
  } catch (error) {
    console.error("Error creating admin:", error);
  } finally {
    mongoose.disconnect();
  }
}

createAdmin();
