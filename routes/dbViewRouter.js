const express = require("express");
const router = express.Router();
const userModel = require("../models/user-model");
const ownerModel = require("../models/owner-model");
const productModel = require("../models/product-model");

// IMPORTANT: Remove or secure this route before production use
// This is for development/debugging only

if (process.env.NODE_ENV === "development") {
  // View all users
  router.get("/users", async (req, res) => {
    try {
      const users = await userModel.find().select("-password");
      res.json(users);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // View all owners
  router.get("/owners", async (req, res) => {
    try {
      const owners = await ownerModel.find().select("-password");
      res.json(owners);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // View all products
  router.get("/products", async (req, res) => {
    try {
      const products = await productModel.find();
      // Convert Buffer to base64 string for viewing
      const productsWithImages = products.map(product => {
        const { _id, name, price, discount, bgcolor, panelcolor, textcolor } = product;
        return {
          _id,
          name,
          price,
          discount,
          bgcolor,
          panelcolor,
          textcolor,
          // Don't include image in JSON response as it's too large
          hasImage: product.image ? true : false
        };
      });
      res.json(productsWithImages);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
}

module.exports = router;
