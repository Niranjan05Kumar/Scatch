const express = require("express");
const app = express();

// Load environment variables first
require("dotenv").config();

// Check for required environment variables
if (!process.env.MONGO_URI) {
  console.warn("WARNING: MONGO_URI environment variable not set!");
}

// Test route first (before any other imports)
app.get('/test', (req, res) => {
  res.json({ 
    message: 'App is working!', 
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV,
    mongoUri: process.env.MONGO_URI ? 'Set' : 'Not Set'
  });
});

// Try to load modules with error handling
let db, ownerRouter, userRouter, productRouter, indexRouter, dbViewRouter;

try {
  db = require("./config/mongoose-connection");
  ownerRouter = require("./routes/ownerRouter");
  userRouter = require("./routes/userRouter");
  productRouter = require("./routes/productRouter");
  indexRouter = require("./routes/index");
  dbViewRouter = require("./routes/dbViewRouter");
} catch (error) {
  console.error("Error loading modules:", error.message);
}

const cookieParser = require("cookie-parser");
const ejs = require("ejs");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET || "fallback-secret",
  })
);
app.use(flash());

// Only add routes if modules loaded successfully
if (indexRouter) app.use("/", indexRouter);
if (ownerRouter) app.use("/owners", ownerRouter);
if (userRouter) app.use("/users", userRouter);
if (productRouter) app.use("/products", productRouter);
if (dbViewRouter) app.use("/db-view", dbViewRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found', path: req.path });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ 
    error: 'Something broke!', 
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// For Vercel serverless functions
module.exports = app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}
