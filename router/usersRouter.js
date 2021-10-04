// external imports
const express = require("express");
const { isAdmin, isLogin } = require("../controller/loginController");

// internal imports
const {
   getAllProducts, getOneProduct, takeOrder,
} = require("../controller/usersController");
const { requireRole, checkLogin } = require("../middlewares/common/checkLogin");

const router = express.Router();

router.get('/allProduct', getAllProducts )

router.get('/getOneProduct/:id', getOneProduct )

router.get('/isAdmin/:jwtToken', isAdmin)

router.post('/purchaseOrder/:jwtToken', checkLogin, requireRole(["admin", "user"]),  takeOrder)


module.exports = router;
