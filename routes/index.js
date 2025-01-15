const express = require('express');
const isLoggedIn = require('../middlewares/isLoggedIn');
const productModel = require("../models/product-model");
const router=express.Router();

router.get('/',(req,res)=>{
    let error=req.flash("error");
    res.render("index",{error})
});

router.get("/shop",isLoggedIn,async function(req,res){
    let product = await productModel.find()
    res.render("shop" , {products : product});
})



module.exports=router;