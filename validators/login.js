const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorRegister = [
  check("name").exists().notEmpty().trim(),
  check("email").exists().notEmpty().isEmail().trim(),
  check("password").exists().notEmpty().trim(),
  check("age").exists().notEmpty().isNumeric(),
  check("city").exists().notEmpty().trim(),
  check("interests").exists().isArray(),
  check("interests.*").trim(),
  check("allowsReceivingOffers").exists().isBoolean(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorLogin = [
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = {
  validatorRegister,
  validatorLogin,
};
