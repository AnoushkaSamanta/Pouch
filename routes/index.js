const express = require("express");
const isLoggedIn = require("../middlewares/isLoggedIn");
const productModel = require("../models/product-model");
const userModel = require("../models/user-model");
const router = express.Router();

router.get("/", (req, res) => {
  let error = req.flash("error");
  res.render("index", { error, loggedin: false });
});

router.get("/shop", isLoggedIn, async function (req, res) {
  let product = await productModel.find();
  let success = req.flash("success");
  res.render("shop", { products: product, success: success });
});

router.get("/cart", isLoggedIn, async function (req, res) {
  let user = await userModel.findOne({email:req.user.email}).populate("cart");

  res.render("cart",{user});
});


router.get("/addtocart/:id", isLoggedIn, async function (req, res) {
  let user = await userModel.findOne({ email: req.user.email });
  if(!user.cart.includes(req.params.id))
 { user.cart.push(req.params.id);
  await user.save();
  req.flash("success", "Added to cart");}
  else{
    req.flash("success", "Already in cart");
  }
  res.redirect("/shop");
});

module.exports = router;
