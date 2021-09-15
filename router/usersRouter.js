// external imports
const express = require("express");
const { isAdmin, isLogin } = require("../controller/loginController");

// internal imports
const {
   getAllProducts,
} = require("../controller/usersController");

const router = express.Router();

router.get('/allProduct', getAllProducts )

router.get('/isAdmin/:jwtToken', isAdmin)


module.exports = router;
