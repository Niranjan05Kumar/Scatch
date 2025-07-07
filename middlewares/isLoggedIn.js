const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");

module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      req.flash("error", "You are not logged in, please login first");
      return res.redirect("/");
    }

    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await userModel
      .findOne({ email: decoded.email })
      .select("-password");

    if (!user) {
      return res.status(404).send("User not found");
    }

    req.user = user;
    next();
  } catch (err) {
    req.flash("error", err.message);
    return res.redirect("/");
  }
};
