
const express = require("express");
const { validatorRegister, validatorLogin } = require("../validators/login");
const { registerUser, loginUser } = require("../controllers/login");
const router = express.Router();

router.post("/signup", validatorRegister, registerUser);
router.post("/", validatorLogin, loginUser);

module.exports = router;