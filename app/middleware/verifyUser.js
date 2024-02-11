const jwt = require('jsonwebtoken');
const errorHandler = require('./error.js');
const verifyToken = (req, res, next) => {
  //console.log('req_cookie', req.cookies);
  const token = req.cookies.access_token;
  //console.log(token);
  if (!token) {
    return next(errorHandler(401, 'Unauthorized user'));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(errorHandler(401, 'Unauthorized user'));
    }
    req.user = user;
    next();
  });
};

module.exports = verifyToken;
