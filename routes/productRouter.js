const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const { createProduct, deleteProduct, removeFromCart } = require("../controllers/productsController");
const isloggedIn = require("../middlewares/isloggedIn");

router.post("/create", upload.single("image"), createProduct);

router.get("/delete/:productId", deleteProduct);

router.get("/remove/:productId", isloggedIn, removeFromCart);

module.exports = router;
