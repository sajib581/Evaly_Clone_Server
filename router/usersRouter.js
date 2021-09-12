// external imports
const express = require("express");

// internal imports
const {
   getAllProducts,
} = require("../controller/usersController");

const router = express.Router();

router.get('/allProduct', getAllProducts )

module.exports = router;
