const express = require("express");
const {
  validatorEmail,
  validatorPassword,
  validatorInfo,
} = require("../validators/users");
const {
  registerUser,
  loginUser,
  forgotPassword,
  changeForgotPassword,
} = require("../controllers/login");
const router = express.Router();

router.post(
  "/signup",
  validatorEmail,
  validatorPassword,
  validatorInfo,
  registerUser
);
router.post("/", validatorEmail, validatorPassword, loginUser);
router.post("/forgot-password", validatorEmail, forgotPassword);
router.post("/forgot-password/:token", validatorPassword, changeForgotPassword);

module.exports = router;
