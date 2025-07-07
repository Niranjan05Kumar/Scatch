const userModel = require("../models/user-model");
const { generateToken } = require("../utils/generateToken");
const { hashPassword, comparePassword } = require("../utils/hashPassword");

module.exports.registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      req.flash("error", "All fields are required");
      return res.redirect("/");
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      req.flash("error", "You are already registered with this email, please login");
      return res.redirect("/");
    }

    const hashedPassword = await hashPassword(password);

    const user = await userModel.create({
      fullname,
      email,
      password: hashedPassword,
    });

    const token = generateToken(user);
    res.cookie("token", token);
    res.redirect("/shop");
  } catch (err) {
    req.flash("error", err.message);
      return res.redirect("/");
  }
};

module.exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      req.flash("error", "All fields are required");
      return res.redirect("/");
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      req.flash("error", "User not found, please register");
      return res.redirect("/");
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      req.flash("error", "Invalid credentials");
      return res.redirect("/");
    }

    const token = generateToken(user);
    res.cookie("token", token);
    res.redirect("/shop");
  } catch (err) {
    req.flash("error", err.message);
    return res.redirect("/");
  }
};

module.exports.logoutUser = (req, res) => {
  try {
    res.clearCookie("token");
    res.redirect("/");
  } catch (err) {
    req.flash("error", err.message);
    return res.redirect("/");
  }
};
