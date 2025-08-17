const express = require("express");
const app = express();

// Load environment variables first
require("dotenv").config();

// Check for required environment variables
if (!process.env.MONGO_URI) {
  console.warn("WARNING: MONGO_URI environment variable not set!");
}

const db = require("./config/mongoose-connection");
const ownerRouter = require("./routes/ownerRouter");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const indexRouter = require("./routes/index");
const dbViewRouter = require("./routes/dbViewRouter");

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

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'App is working!', timestamp: new Date().toISOString() });
});

app.use("/", indexRouter);
app.use("/owners", ownerRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/db-view", dbViewRouter); // Database viewing route

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).send('Something broke!');
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
