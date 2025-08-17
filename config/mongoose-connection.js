const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");

// Robust MongoDB connection for both local and Vercel
let mongoUri;

try {
  // First try environment variable (Vercel)
  if (process.env.MONGO_URI) {
    mongoUri = process.env.MONGO_URI;
    console.log("Using MONGO_URI from environment variable");
  } else {
    // Fallback to config file (local development)
    const config = require("config");
    mongoUri = config.get("MONGO_URI");
    console.log("Using MONGO_URI from config file");
  }
} catch (error) {
  console.error("Error loading MongoDB URI:", error.message);
  // Fallback URI (you can replace this with your actual URI)
  mongoUri = "mongodb+srv://niranjankumar112005:jkF4Oybwwiek4Vri@cluster0.ozyowe6.mongodb.net/scatch?retryWrites=true&w=majority&appName=Cluster0";
  console.log("Using fallback MongoDB URI");
}

mongoose
  .connect(mongoUri)
  .then(() => {
    dbgr("Connected to MongoDB");
    console.log("✅ MongoDB connected successfully");
  })
  .catch((err) => {
    dbgr("Error connecting to MongoDB:", err);
    console.error("❌ MongoDB connection failed:", err.message);
  });

module.exports = mongoose.connection;
