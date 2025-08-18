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
    default: "https://res.cloudinary.com/demo/image/upload/c_fill,g_face,h_300,w_300/v1/samples/people/default-avatar.png",
  },
  cloudinaryPublicId: {
    type: String,
    default: null,
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

