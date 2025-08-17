const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Load environment variables first
require("dotenv").config();

// Import required modules
const cookieParser = require("cookie-parser");
const ejs = require("ejs");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files
app.use(express.static(path.join(__dirname, "public")));

// Session configuration
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET || "fallback-secret",
  })
);
app.use(flash());

// Import routes
const indexRouter = require("./routes/index");
const ownerRouter = require("./routes/ownerRouter");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const dbViewRouter = require("./routes/dbViewRouter");

// Use routes
app.use("/", indexRouter);
app.use("/owners", ownerRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/db-view", dbViewRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send('Something broke!');
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
  console.log(`📁 Views directory: ${path.join(__dirname, "views")}`);
  console.log(`📁 Public directory: ${path.join(__dirname, "public")}`);
});
