const express = require("express");
const router = express.Router();
const upload = require("../config/multer-config");
const { createProduct, deleteProduct } = require("../controllers/productsController");

router.post("/create", upload.single("image"), createProduct);

router.get("/delete/:productId", deleteProduct);

module.exports = router;
