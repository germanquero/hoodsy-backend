const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorPage = [
  check("city").exists().notEmpty().trim(),
  check("location").exists().notEmpty().trim(),
  check("activity").exists().notEmpty().trim(),
  check("title").exists().notEmpty().trim(),
  check("summary").exists().notEmpty().trim(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorTexts = [
  check("texts").exists().isArray(),
  check("texts.*").exists().trim(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorReview = [
    check("score").exists().isFloat({ min: 0, max: 5 }),
    check("review").exists().notEmpty().trim(),
    (req, res, next) => {
      return validateResults(req, res, next);
    },
  ];

module.exports = {
  validatorPage,
  validatorTexts,
  validatorReview,
};
