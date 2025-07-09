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