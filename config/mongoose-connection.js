const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/pouch")
  .then(function () {
    console.log("Connected to database");
  })
  .catch(function (err) {
    console.log(err);
  });

module.exports = mongoose.connection;