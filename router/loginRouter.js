// external imports
const express = require("express");

// internal imports
const { getLogin, login, logout, signup, isLogin } = require("../controller/loginController");
const { checkLogin } = require("../middlewares/common/checkLogin");
const {
  doLoginValidators,
  doLoginValidationHandler,
} = require("../middlewares/login/loginValidators");

const router = express.Router();

//Home Page
router.get('/',(req, res) => {
  res.send("It is Working Fine")
})

router.post(
  "/login",
  // doLoginValidators,
  // doLoginValidationHandler,
  login
);

router.post('/signup', signup )

router.get('/isLoggedIn/:jwtToken', isLogin )

// logout
router.delete(
  "/logout",
  checkLogin ,
  logout
);

module.exports = router;
