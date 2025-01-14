const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user-model");
const generateToken = require("../utils/generateToken");
const flash = require("connect-flash");

module.exports.registerUser = async function (req, res) 
{
  try 
  {
    let { fullname, email, password } = req.body;

    let user = await userModel.findOne({ email: email });
    if (user) 
    {
      req.flash("You already have an account.Please login");
      return res.redirect("/");
    }
    bcrypt.genSalt(10, function (err, salt) 
    {
      bcrypt.hash(password, salt, async function (err, hash) 
      {
        if (err) return res.send(err.message);
        else 
        {
          let user = await userModel.create({
            fullname,
            email,
            password: hash,
          });
          let token = generateToken(user);
          res.cookie("token", token);
          req.flash("User created successfully");
          return res.redirect("/shop");
        }
      });
    });
  }
   catch (err) 
   {
    console.log(err.message);
  }
};

module.exports.loginUser = async function (req, res) 
{
  let { email, password } = req.body;
  let user = await userModel.findOne({ email: email });
  if (!user) 
  {
    req.flash("Email or password incorrect");
    res.redirect("/");
  }

  bcrypt.compare(password, user.password, function (err, result) 
  {
    if (result) 
    {
      let token = generateToken(user);
      res.cookie("token", token);
      res.redirect("/shop");
    } else 
    {
      req.flash("Email or password incorrect");
      return res.redirect("/");
    }
  });
};

module.exports.logout = function (req, res) 
{
  res.cookie("token", "");
  res.redirect("/");
};
