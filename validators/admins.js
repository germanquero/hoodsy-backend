const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorAdmin = [
  check("name").exists().notEmpty().trim(),
  check("email").exists().notEmpty().isEmail(),
  check("phoneNumber").exists().notEmpty().isMobilePhone(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = {
    validatorAdmin,
  };