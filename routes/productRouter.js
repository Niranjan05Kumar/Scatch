const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Product Page");
});

module.exports = router;