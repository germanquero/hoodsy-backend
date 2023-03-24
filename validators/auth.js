const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

const validatorGetUser = [
  check("id").exists().notEmpty().isMongoId(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorRegister = [
  check("name").exists().notEmpty().isLength({ min: 3, max: 99 }),
  check("age").exists().notEmpty().isNumeric(),
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 8, max: 16 }),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

const validatorChangeRol = [
  check('role').exists().notEmpty(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
]

const validatorLogin = [
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 8, max: 16 }),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

module.exports = { validatorRegister, validatorLogin, validatorGetUser, validatorChangeRol };
