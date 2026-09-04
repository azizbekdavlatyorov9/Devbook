const CustomErrorHandler = require("../error/error");
const bookValidator = require("../validator/book.validator");

module.exports = function (req, res, next) {
  const { error } = bookValidator(req.body);

  if (error) {
    throw CustomErrorHandler.BadRequest(error);
  }
  next();
};
