const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    minLength: 3,
    trim: true,
  },
  email: String,
  password: String,
  contact: Number,
  picture: {
    type: String,
    default: "/images/uploads/profiles/default-avatar.png",
  },
  cart: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",
  }],
  orders: {
    type: Array,
    default: [],
  },
  date:{
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("user", userSchema);

