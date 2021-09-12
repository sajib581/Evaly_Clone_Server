// external imports
const express = require("express");
const { addProduct } = require("../controller/adminController");
const { checkLogin, requireRole } = require("../middlewares/common/checkLogin");

// internal imports

const router = express.Router();

router.post('/addProduct', checkLogin , requireRole(["admin"]),   addProduct )

module.exports = router;
