const express = require("express");
const router = express.Router();
const ownerModel = require("../models/owner-model");
const productModel = require("../models/product-model");

if (process.env.NODE_ENV === "development") {
  router.post("/create", async (req, res) => {
    const { fullname, email, password } = req.body;

    const ownerExists = await ownerModel.find();
    if (ownerExists.length > 0) {
      return res
        .status(400)
        .send("you don't have permission to create an owner");
    }

    const createdOwner = await ownerModel.create({
      fullname,
      email,
      password,
    });

    res.status(201).send("Owner created successfully");
  });
}

router.get("/", async (req, res) => {
  let error = req.flash("error");
  let success = req.flash("success");
  let products = await productModel.find();
  res.render("createproducts", {
    error, 
    success, 
    products, 
    loggedIn: false, 
    activeTab: "all-products"
  });
});

router.get("/create", async (req, res) => {
  let error = req.flash("error");
  let success = req.flash("success");
  let products = await productModel.find();
  res.render("createproducts", {
    error, 
    success, 
    products, 
    loggedIn: false, 
    activeTab: "create-product"
  });
});

module.exports = router;
