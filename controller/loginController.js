// external imports
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const createError = require("http-errors");

// internal imports
const User = require("../models/People");

// add user
async function signup(req, res, next) {
  let newUser;
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  newUser = new User({
    ...req.body,
    password: hashedPassword,
  });

  // save user or send error
  try {
    const result = await newUser.save();
    res.status(200).json({
      message: "User was added successfully!",
    });
  } catch (err) {
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occured!",
        },
      },
    });
  }
}

// do login
async function login(req, res, next) {
  try {
    // find a user who has this email/username
    const user = await User.findOne({
      $or: [{ email: req.body.username }, { mobile: req.body.username }],
    });

    if (user && user._id) {
      const isValidPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );

      if (isValidPassword) {
        console.log("Hitted");
        // prepare the user object to generate token
        const userObject = {
          userId: user._id,
          username: user.name,
          mobile: user.mobile,
          email: user.email,
          avatar : user.avatar,
          role: user.role || "user",
        };

        // generate token
        const token = jwt.sign(userObject, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRY,
        });
             // // set cookie
        res.cookie("panda-commerce", token, {
          maxAge: process.env.JWT_EXPIRY,
          expires : new Date(Date.now() + 555565656565)  ,
          httpOnly: true,
          signed: true,
        });
        
        res.status(200).json({
          result : true,
          jsonWebToken : token,
          userData : userObject
        });

      } else {
        throw createError("Login failed! Please try again.");
      }
    } else {
      throw createError("Login failed! Please try again.");
    }
  } catch (err) {
    res.status(403).json({
      errors: {
        common: {
          msg: err.message,
        },
      }
    });
  }
}


const isLogin = (req, res, next) => {
  const token = req.params.jwtToken ;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      res.status(200).json({
        userData : decoded
      });
    } catch (err) {
      res.status(403).json({
        error: "Authetication failure!",
      });
    }
  } else {
    res.status(403).json({
      error: "Authetication failure!",
    });
  }
};

// Check either admin or not 
function isAdmin(req, res, next) {
  const token = req.params.jwtToken ;
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if(decoded.role === "admin"){
    res.send(true);
  }else{
    res.send(false);
  }
}

// do logout
function logout(req, res) {
  res.clearCookie(process.env.COOKIE_NAME);
  res.send("logged out");
}

module.exports = {
  signup,
  login,
  logout,
  isAdmin,
  isLogin
};
