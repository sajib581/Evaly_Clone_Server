const Product = require("../models/Product");

const addProduct = async (req, res, next) => {
  let newProduct;

  newProduct = new Product({
    ...req.body,
    addedBy : {
      id : req.user.userId,
      name: req.user.username,
      avatar : req.user.avatar
    }
  } );

  // save product in database
  try {
    const result = await newProduct.save();
    res.status(200).json({
      message: "One Product is added successfully!",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occured!",
        },
      },
    });
  }

};

module.exports = {
  addProduct,
};
