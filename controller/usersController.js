// internal imports
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
    const allProducts = await Product.find()
    res.json({
      data : allProducts
    })
    // res.send(allProducts)
  } catch (error) {
    next(error.message);
  }
}

module.exports = {
  getUsers,
  getAllProducts
};
