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
  try {
    let user = await userModel
      .findOne({ email: req.user.email })
      .populate("cart");

    let success = req.flash("success");
    
    // Create cartItems array with quantity property
    let cartItems = [];
    let total = 0;
    
    if (user.cart && user.cart.length > 0) {
      cartItems = user.cart.map(product => {
        const quantity = 1; // Default quantity, you can implement quantity tracking later
        const itemTotal = (product.price + 20 - product.discount) * quantity;
        total += itemTotal;
        
        return {
          productId: product,
          quantity: quantity
        };
      });
    }
    
    res.render("cart", { user, success, cartItems, total });
  } catch (err) {
    console.error("Cart error:", err);
    req.flash("error", "Error loading cart");
    res.redirect("/shop");
  }
});

router.post("/updatecart/:productId", isLoggedIn, async (req, res) => {
  try {
    const { quantity } = req.body;
    
    if (quantity <= 0) {
      return res.json({ success: false, message: "Invalid quantity" });
    }
    
    // For now, we'll just return success since cart doesn't store quantity yet
    // You can implement quantity storage in user model later
    res.json({ success: true, message: "Quantity updated" });
  } catch (err) {
    console.error("Update cart error:", err);
    res.json({ success: false, message: "Failed to update cart" });
  }
});

router.get("/removefromcart/:productId", isLoggedIn, async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.user.email }).select("-password");
    user.cart = user.cart.filter((item) => item._id.toString() !== req.params.productId);
    await user.save();
    req.flash("success", "Product removed from cart successfully");
    res.redirect("/cart");
  } catch (err) {
    console.error("Remove from cart error:", err);
    req.flash("error", "Failed to remove product from cart");
    res.redirect("/cart");
  }
});

router.get("/account", isLoggedIn, async (req, res) => {
  let user = await userModel.findById(req.user._id);
  let success = req.flash("success");
  res.render("account", { user, success });
});

router.get("/ownerlogin", async (req, res) => {
  let error = req.flash("error");
  let success = req.flash("success");
  res.render("owner-login", {
    error,
    success,
    loggedIn: false,});
});

module.exports = router;
