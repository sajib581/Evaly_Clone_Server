// external imports
const express = require("express");

// internal imports
const { getLogin, login, logout, signup } = require("../controller/loginController");
const { checkLogin } = require("../middlewares/common/checkLogin");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
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

// logout
router.delete(
  "/logout",
  checkLogin ,
  logout
);

module.exports = router;
