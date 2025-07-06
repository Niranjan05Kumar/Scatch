const mongoose = require("mongoose");
const dbgr = require("debug")("development:mongoose");
// development = anyname that you want to give
// mongoose = anyname that you want to give
const config = require("config");

mongoose
  .connect(`${config.get("MONGO_URI")}/scatch`)
  .then(() => {
    dbgr("Connected to MongoDB");
  })
  .catch((err) => {
    dbgr("Error connecting to MongoDB:", err);
  });

module.exports = mongoose.connection;
