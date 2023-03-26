const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorCreateAdmin = [
  check("forename").exists().notEmpty().trim(),
  check("surname").exists().notEmpty().trim(),
  check("email").exists().notEmpty().isEmail().trim(),
  check("phoneNumber").exists().notEmpty().isMobilePhone().trim(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorRegisterMerchant = [
  check("name").exists().notEmpty().trim(),
  check("cif").exists().notEmpty().trim(),
  check("address").exists().notEmpty().trim(),
  check("email").exists().notEmpty().isEmail().trim(),
  check("phoneNumber").exists().notEmpty().isMobilePhone().trim(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorCreateAdmin, validatorRegisterMerchant };

// forename: {
//     type: String,
//     required: true,
//     trim: true,
// },
// surname: {
//     type: String,
//     required: true,
//     trim: true,
// },
// email: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
//     lowercase: true,
// },
// phoneNumber: {
//     type: String,
//     required: true,
//     unique: true,
//     trim: true,
// },
