const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");
const productModel = require("../models/product-model");

// Allow owner creation in all environments
router.post("/create", async (req, res) => {
    const { fullname, email, password } = req.body;

    const ownerExists = await ownerModel.find();
    if (ownerExists.length > 0) {
      req.flash("error", "You don't have permission to create an owner");
      return res.redirect("/ownerlogin");
    }

    const createdOwner = await ownerModel.create({
      fullname,
      email,
      password,
    });
    let error = req.flash("error");
    let success = req.flash("success");
    let products = await productModel.find();
    req.flash("success", "Owner created successfully");
    return res.render("admin", {
      success,
      error,
      products,
      loggedIn: false,
      activeTab: "all-products",
    });
  });

router.get("/", async (req, res) => {
  let error = req.flash("error");
    let success = req.flash("success");
    let products = await productModel.find();
    res.render("admin", {
      error,
      success,
      products,
      loggedIn: false,
      activeTab: "all-products",
    });
  });

  router.get("/create", async (req, res) => {
    let error = req.flash("error");
    let success = req.flash("success");
    let products = await productModel.find();
    res.render("admin", {
      error,
      success,
      products,
      loggedIn: false,
      activeTab: "create-product",
    });
  });

module.exports = router;
