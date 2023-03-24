const express = require("express");
const { registerCtrl, loginCtrl, editCtrl } = require("../controllers/auth");
const authMiddleware = require("../middleware/session");
const { validatorRegister, validatorLogin, validatorGetUser, validatorChangeRol } = require("../validators/auth");
const checkRol = require('../middleware/rol')


const router = express.Router()

router.post('/register', validatorRegister, registerCtrl)

router.post('/login', validatorLogin, loginCtrl)

router.put('/edit/:id', authMiddleware, checkRol('admin'), validatorGetUser, validatorChangeRol, validatorRegister, editCtrl)

module.exports = router