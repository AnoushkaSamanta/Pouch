const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  image: {
    type: Buffer,
    required: [true, "Product image is required"],
  },
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
    minLength: [3, "Product name must be at least 3 characters long"],
    maxLength: [100, "Product name cannot exceed 100 characters"],
  },
  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"],
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, "Discount cannot be negative"],
    max: [100, "Discount cannot exceed 100%"],
  },
  bgcolor: {
    type: String,
   
  },
  panelcolor: {
    type: String,
   
  },
  textcolor: {
    type: String,

  },
});

module.exports = mongoose.model("product", productSchema);
