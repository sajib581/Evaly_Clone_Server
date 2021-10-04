// internal imports
const Order = require("../models/OrderedProducts");
const User = require("../models/People");
const Product = require("../models/Product");

// get users page
async function getUsers(req, res, next) {
  try {
    const users = await User.find();
    res.render("users", {
      users: users,
    });
  } catch (err) {
    next(err);
  }
}

// get all products added by admin
const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.json({
      data: allProducts,
    });
    // res.send(allProducts)
  } catch (error) {
    next(error.message);
  }
};

//get a single product
const getOneProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const allProducts = await Product.findOne({ _id: productId });
    res.json({
      data: allProducts,
    });
    // res.send(allProducts)
  } catch (error) {
    next(error.message);
  }
};

//purchaseOrder
const takeOrder = async (req, res) => {
  console.log("Hitted Controller");
  const data = req.body;
  let orderedProducts;
  const cart = data.orderedProducts;
  orderedProducts = new Order({ ...data });
  try {
    const result = await orderedProducts.save();
    let remindQuantity;
    cart.forEach(async (element) => {
      // console.log(element.currentQuantity - element.quantity);
      console.log("element._id ", element._id);
      remindQuantity = element.currentQuantity - element.quantity;
      const result =  await Product.findByIdAndUpdate(
        { _id: element._id },
        { $set: { quantity: remindQuantity } },
        { useFindAndModify: false }
      );
    });
    res.status(200).json({
      message: "Order saved successfully!",
    });
  } catch (error) {
    res.status(500).json({
      errors: {
        common: {
          msg: error.message,
        },
      },
    });
  }
};

module.exports = {
  getUsers,
  getAllProducts,
  getOneProduct,
  takeOrder,
};
