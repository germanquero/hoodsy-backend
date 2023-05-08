const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorEmail = [
  check("email").exists().notEmpty().isEmail(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorPassword = [
  check("password").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorInfo = [
  check("name").exists().notEmpty().trim(),
  check("age").exists().notEmpty().isNumeric(),
  check("city").exists().notEmpty().trim(),
  check("interests").exists().isArray(),
  check("interests.*").trim(),
  check("allowsReceivingOffers").exists().isBoolean(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = {
    validatorEmail,
    validatorPassword,
    validatorInfo,
  };