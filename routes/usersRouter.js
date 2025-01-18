const express = require("express");
const {registerUser,loginUser,logout}=require("../controllers/authController")
const router = express.Router();

router.get("/", function (req, res) {
  res.send("hey");
});

router.post("/register",registerUser);

router.post("/login",loginUser)


router.get("/logout",logout)

router.get("/account",function(req,res){
  
  console.log(req.user)
  res.render("account");
})
module.exports = router;
