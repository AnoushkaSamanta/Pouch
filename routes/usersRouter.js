const express = require("express");
const userModel = require("../models/user-model");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken")

router.get("/", function (req, res) {
  res.send("hey");
});

router.post("/register", function (req, res) {
  try {
    let { fullname, email, password } = req.body;
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) return res.send(err.message);
        else {
          let user = await userModel.create({ fullname, email, password:hash });
          jwt.sign()
        }
      });
    });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
