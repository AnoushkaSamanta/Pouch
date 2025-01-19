const express = require("express");
const {
  registerUser,
  loginUser,
  logout,
} = require("../controllers/authController");
const  isLoggedIn  = require("../middlewares/isLoggedIn");
const router = express.Router();
const userModel=require("../models/user-model")
const upload = require("../config/multer-config");

router.get("/", function (req, res) {
  res.send("hey");
});

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/logout", logout);

router.get("/account",isLoggedIn, async (req, res)=> {
  let user = await userModel.findOne({email:req.user.email});

  res.render("account",{user});
});

router.get("/profilepic",isLoggedIn,(req,res)=>{
  res.render("profilepic")
})

router.post("/uploadprofilepic",isLoggedIn, upload.single("picture"),async (req,res)=>{
  let user=await userModel.findOne({email:req.user.email});
   user.picture= req.file.buffer;
   user.save();
   console.log(user)
   res.redirect("/users/account")
})
module.exports = router;
