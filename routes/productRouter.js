const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const { createProduct, deleteProduct, removeFromCart } = require("../controllers/productsController");
const isLoggedIn = require("../middlewares/isLoggedIn");

router.post("/create", upload.single("image"), createProduct);

router.get("/delete/:productId", deleteProduct);

router.get("/remove/:productId", isLoggedIn, removeFromCart);

module.exports = router;
