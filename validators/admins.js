const { check } = require("express-validator");
const validateResults = require("../utils/handleValidator");

// Este validador funciona para merchants y admins,
// en los casos de busqueda actualizacion y borrado
const validatorGetById = [
  check("id").exists().isMongoId().trim(),
  (req, res, next) => {
    return validateResults(req, res, next);
  },
];

// Validador para la creacion y edicion de Admins
const validatorAdmin = [
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

module.exports = {
  validatorAdmin,
  validatorGetById,
  validatorRegisterMerchant,
};