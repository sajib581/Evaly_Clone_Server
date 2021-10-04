const mongoose = require("mongoose");

const orderSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    address: {
        type: String,
        required: true,
        trim: true,
      },
    phone: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "pickup", "delivered"],
      default: "pending",
    },
    subTotal: {
        type: String,
        required: true,
      },
      deliveryFee: {
        type: String,
        required: true,
      },
      totalDiscount: {
        type: String,
        required: true,
      },
      total: {
        type: String,
        required: true,
      },
      orderedProducts: [
          {
              quantity : {
                type: String,
                required: true,
              },
              categories : {
                type: String,
                required: true,
              },
              discount : {
                type: String,
                required: true,
              },
              image : {
                type: String,
                required: true,
              },
              productName : {
                type: String,
                required: true,
              },
              price : {
                type: String,
                required: true,
              },
              afterDiscountPrice : {
                type: String,
                required: true,
              },
              seller : {
                type: String,
                required: true,
              },
          }
      ]
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
