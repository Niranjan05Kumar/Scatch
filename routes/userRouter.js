const express = require("express");
const router = express.Router();
const { registerUser, loginUser, logoutUser, updateProfile } = require("../controllers/usersController");
const isloggedIn = require("../middlewares/isLoggedin");
const userModel = require("../models/user-model");

router.get("/", isloggedIn, (req, res) => {
  res.redirect("/account");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.get("/edit", isloggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email}).select("-password");
  const error = req.flash("error");
  const success = req.flash("success");
  res.render("userEdit", { user, error, success });
});

router.post("/update", isloggedIn, updateProfile);


module.exports = router;
