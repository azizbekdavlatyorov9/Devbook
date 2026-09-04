const joi = require("joi");

const Periods = {
  TEMURIY: "Temuriylar davri",
  JADID: "Jadid davri",
  SOVET: "Sovet davri",
  MUSTAQILLIK: "Mustaqillik davri",
};

const Genres = {
  FANTASTIK: "fantastik",
  BADIIY: "badiiy",
  DRAMA: "drama",
  MELODRAMA: "melodrama",
  DETEKTIV: "detektiv",
  SARGUZASHT: "sarguzasht",
  TARIXIY: "tarixiy",
  ILMIY_FANTASTIK: "ilmiy-fantastik",
};

module.exports = function (data) {
  const schema = joi.object({
    title: joi.string().min(3).max(150).required(),

    period: joi
      .string()
      .valid(...Object.values(Periods))
      .required(),

    published_year: joi
      .number()
      .integer()
      .min(0)
      .max(new Date().getFullYear())
      .required(),

    pages: joi.number().integer().min(1).max(10000).required(),

    publisher: joi.string().required(),

    genres: joi
      .string()
      .valid(...Object.values(Genres))
      .required(),

    details: joi.string().required(),

    author_info: joi.string().length(24).hex().required(),
  });

  return schema.validate(data);
};
