const CustomErrorHandler = require("../error/error");
const authValidator = require("../validator/auth.validator");

module.exports = function (req, res, next) {
  const { error } = authValidator(req.body);

  if (error) {
    throw CustomErrorHandler.BadRequest(error);
  }
  next();
};
