const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");

router.get("/", (req, res) => {
  const error = req.flash("error");
  res.render("index", { error, loggedIn: false });
});

router.get("/shop", isLoggedIn, async (req, res) => {
  const user = req.user;
  let warning = req.flash("warning");
  let success = req.flash("success");
  let products = await productModel.find();
  res.render("shop", {
    user,
    products,
    warning,
    success,
    activeTab: "all-products",
  });
});
router.get("/shop/discounted", isLoggedIn, async (req, res) => {
  const user = req.user;
  let warning = req.flash("warning");
  let success = req.flash("success");
  let products = await productModel.find();
  let discountedProducts = products.filter((product) => {
    return product.discount > 0;
  });
  res.render("shop", {
    user,
    discountedProducts,
    warning,
    success,
    activeTab: "discounted-products",
  });
});

router.get("/addtocart/:productid", isLoggedIn, async (req, res) => {
  const productId = req.params.productid;
  const user = await userModel.findOne({ email: req.user.email });

  if (!user.cart.includes(productId)) {
    user.cart.push(productId);
    await user.save();
    req.flash("success", "Product added to cart!");
    res.redirect("/shop");
  } else {
    req.flash("warning", "Product is already in your cart.");
    res.redirect("/shop");
  }
});

router.get("/cart", isLoggedIn, async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("cart");

  let success = req.flash("success");
  res.render("cart", { user, success });
});

router.get("/account", isLoggedIn, async (req, res) => {
  let user = await userModel.findById(req.user._id);
  let success = req.flash("success");
  res.render("account", { user, success });
});

module.exports = router;
