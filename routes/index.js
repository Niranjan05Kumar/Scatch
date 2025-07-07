const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");

router.get("/", (req, res) => {
  const error = req.flash("error");
  res.render("index", { error });
});

router.get("/shop", isLoggedIn, (req, res) => {
  const user = req.user;
  res.render("shop", { user });
});

module.exports = router;
