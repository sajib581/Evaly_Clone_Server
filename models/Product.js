const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: [
    {
      type: String,
      required: true,
    },
  ],
  image: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  seller: {
    type: String,
    default: "self",
  },
  quantity: {
    type: String,
    required: true,
  },
  rating: {
    type: String,
  },
  review: [
    {
      type: mongoose.Types.ObjectId,
      ref: "review",
    },
  ],
  categories: {
    type: String,
    required: true,
  },
  addedBy: {
    id: mongoose.Types.ObjectId,
    name: String,
    avatar: String,
  },
}, {
    timestamps : true,
});

const Product = mongoose.model("Products", productSchema);

module.exports = Product;
