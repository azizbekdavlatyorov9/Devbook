const joi = require("joi");

const Periods = {
  TEMURIY: "Temuriylar davri",
  JADID: "Jadid davri",
  SOVET: "Sovet davri",
  MUSTAQILLIK: "Mustaqillik davri",
};

module.exports = function (data) {
  const schema = joi.object({
    full_name: joi.string().required(),
    birth_year: joi.number().integer().required(),
    death_year: joi.string().required(),
    bio: joi.string(),
    period: joi
      .string()
      .valid(...Object.values(Periods))
      .required(),
    work: joi.string().required(),
    region: joi.string().required(),
  });
  return schema.validate(data);
};
