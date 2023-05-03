const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorGetById = [
  check("id").exists().isMongoId().trim(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorGetPicture = [
  check("filename").exists().trim(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorRegister = [
  check("name").exists().notEmpty().trim(),
  check("age").exists().notEmpty().isNumeric(),
  check("email").exists().notEmpty().isEmail().trim(),
  check("password").exists().notEmpty().trim(),
  check("city").exists().notEmpty().trim(),
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

const validatorEditAcctount = [
  check("name").optional().notEmpty().trim(),
  check("age").optional().notEmpty().isNumeric(),
  check("email").optional().notEmpty().isEmail().trim(),
  check("city").optional().notEmpty().trim(),
  check("allowsReceivingOffers").optional().isBoolean(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorDeleteAccount = [
  check("password").exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = {
  validatorGetById,
  validatorGetPicture,
  validatorRegister,
  validatorLogin,
  validatorEditAcctount,
  validatorDeleteAccount,
};
