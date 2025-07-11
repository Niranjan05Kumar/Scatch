const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

const db = require("./config/mongoose-connection");
const ownerRouter = require("./routes/ownerRouter");
const userRouter = require("./routes/userRouter");
const productRouter = require("./routes/productRouter");
const indexRouter = require("./routes/index");

const cookieParser = require("cookie-parser");
const ejs = require("ejs");
const path = require("path");
const session = require("express-session");
const flash = require("connect-flash");
require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.EXPRESS_SESSION_SECRET,
  })
);
app.use(flash());

app.use("/", indexRouter);
app.use("/owners", ownerRouter);
app.use("/users", userRouter);
app.use("/products", productRouter);

app.listen(port);
