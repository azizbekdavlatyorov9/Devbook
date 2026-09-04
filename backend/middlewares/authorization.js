const jwt = require("jsonwebtoken");
const CustomErrorHandler = require("../error/error");

module.exports = function authorization(req, res, next) {
  try {
    const token = req.cookies.accessToken;

    if (!token) {
      throw CustomErrorHandler.BadRequest("No token provided");
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decode;

    next();
  } catch (error) {
    next(error);
  }
};
