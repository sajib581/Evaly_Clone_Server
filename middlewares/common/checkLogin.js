// auth guard to protect routes that need authentication
var jwt = require('jsonwebtoken');
const checkLogin = (req, res, next) => {
  const token = req.params.jwtToken;
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      res.status(403).json({
        errors: {
          common: {
            msg: err.message
          },
        },
      });
    }
  } else {
    res.status(401).json({
      error: "Authetication failure!",
    });
  }
};


function requireRole(role) {
  return function (req, res, next) {
    if (req.user.role && role.includes(req.user.role)) {
      next();
    } else {
      res.status(403).json({
        errors: {
          common: {
            msg: "You are not authorized!",
          },
        },
      });
    }
  };
}

module.exports = {
  checkLogin,
  requireRole
};
