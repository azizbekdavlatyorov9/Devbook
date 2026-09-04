const joi = require("joi");

module.exports = function (data) {
  const schema = joi.object({
    username: joi.string()
      .min(3)
      .max(50)
      .required(),

    lastName: joi.string()
      .min(2)
      .max(50)
      .required(),

    phone: joi.string()
      .required(),

    email: joi.string()
      .email()
      .required(),

    password: joi.string()
      .min(6)
      .required(),
  });

  return schema.validate(data);
};