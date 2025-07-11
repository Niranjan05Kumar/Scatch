const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser, updateProfile } = require("../controllers/usersController");
const isLoggedIn = require("../middlewares/isLoggedIn");
const userModel = require("../models/user-model");

router.get("/", isLoggedIn, (req, res) => {
  res.redirect("/account");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.get("/edit", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email}).select("-password");
  const error = req.flash("error");
  const success = req.flash("success");
  res.render("userEdit", { user, error, success });
});

router.post("/update", isLoggedIn, updateProfile);


module.exports = router;
