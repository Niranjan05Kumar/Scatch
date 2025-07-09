
const userModel = require("../models/user-model");
const productModel = require("../models/product-model");


module.exports.createProduct =  async (req, res) => {
  try {
    const { name, price, discount, bgcolor, panelcolor, textcolor } = req.body;
    if (!req.file) {
      req.flash("error", "Image is required");
      return res.redirect("/owners");
    }
    if (!name || !price) {
      req.flash("error", "Name and price are required");
      return res.redirect("/owners");
    }

    let product = await productModel.create({
      image: req.file.buffer,
      name,
      price,
      discount,
      bgcolor,
      panelcolor,
      textcolor,
    });

    req.flash("success", "Product created successfully");
    res.redirect("/owners");
  } catch (err) {
    req.flash("error", "Failed to create product");
    res.redirect("/owners");
  }
}

module.exports.deleteProduct =  async (req, res) => {
  try {
    const productId = req.params.productId;
    let product = await productModel.findOneAndDelete({ _id: productId });
    req.flash("success", "Product deleted successfully");
    res.redirect("/owners");
  } catch (err) {
    req.flash("error", "Failed to delete product");
    res.redirect("/owners");
  }
}

module.exports.removeFromCart = async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).select("-password");
    
    user.cart = user.cart.filter((item) => item._id.toString() !== req.params.productId);
    await user.save();
    req.flash("success", "Product removed from cart successfully");
    res.redirect("/cart");
}