const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorPage = [
  check("name").exists().notEmpty().trim(),
  check("cif").exists().notEmpty().trim(),
  check("address").exists().notEmpty().trim(),
  check("city").exists().notEmpty().trim(),
  check("email").exists().notEmpty().isEmail().trim(),
  check("phoneNumber").exists().notEmpty().isMobilePhone().trim(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorTexts = [
  check("texts").exists().isArray(),
  check("texts.*").trim(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorReview = [
    check("texts").exists().isArray(),
    check("texts.*").trim(),
    (req, res, next) => {
      return validateResults(req, res, next);
    },
  ];

module.exports = {
  validatorPage,
  validatorTexts,
  validatorReview,
};
