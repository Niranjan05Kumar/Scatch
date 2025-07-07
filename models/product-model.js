const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
  },
  price: Number,
  discount: {
    type: Number,
    default: 0,
  },
  image: Buffer,
  bgcolor: String,
  panelcolor: String,
  textcolor: String,
});

module.exports = mongoose.model("product", productSchema);
