const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
  {
    review : {
        type: String,
        required: true
    },
    user: {
        id: mongoose.Types.ObjectId,
        name: String,
        avatar: String,
      },
      product : {
          id : mongoose.Types.ObjectId,
      } 
  },
  {
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
