const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");
const productModel = require("../models/product-model");

// Single simple login route for owners
router.post("/login", async (req, res) => {
  try {
    console.log("Owner login attempt with:", req.body);
    const { email, password } = req.body;
    
    // Find the owner by email
    const owner = await ownerModel.findOne({ email });
    console.log("Owner found:", owner ? "Yes" : "No");
    
    if (!owner) {
      console.log("No owner found with email:", email);
      req.flash("error", "Invalid email or password");
      return res.redirect("/ownerlogin");
    }
    
    // Simple password check (plain text comparison)
    if (password !== owner.password) {
      console.log("Password mismatch for:", email);
      req.flash("error", "Invalid email or password");
      return res.redirect("/ownerlogin");
    }
    
    // Success - fetch products and render admin page
    console.log("Login successful for owner:", email);
    const products = await productModel.find();
    
    req.flash("success", "Login successful");
    return res.render("admin", {
      error: req.flash("error"),
      success: req.flash("success"),
      products,
      loggedIn: true,
      activeTab: "all-products",
    });
  } catch (err) {
    console.error("Login error:", err);
    req.flash("error", "An error occurred: " + err.message);
    return res.redirect("/ownerlogin");
  }
});

// Legacy create route - just redirect to login page
router.post("/create", async (req, res) => {
  return res.redirect("/ownerlogin");
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
