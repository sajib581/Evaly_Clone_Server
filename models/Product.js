const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  short_description: [
    {
      type: Object,
      required: true,
    }
  ],
  details: [
    {
      type: Object,
      required: true,
    }
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
  star: {
    type: String,
    default: 0,
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
  discount: {
    type: String,
    required: true,
  },
  addedBy: {
    type: Object,
    id: mongoose.Types.ObjectId,
    name: String,
    email : String,
    // required: true
  },
}, {
    timestamps : true,
});

const Product = mongoose.model("Products", productSchema);

module.exports = Product;
