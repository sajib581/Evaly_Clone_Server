// external imports
const express = require("express");

// internal imports
const {
  removeUser, getAllProducts,
} = require("../controller/usersController");

const { checkLogin } = require("../middlewares/common/checkLogin");
const { logout } = require("../controller/loginController");

const router = express.Router();

router.get('/allProduct', getAllProducts )

module.exports = router;
