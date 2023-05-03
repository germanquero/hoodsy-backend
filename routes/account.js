const express = require("express");
const { validatorEditAcctount, validatorDeleteAccount } = require("../validators");
const { getAccount, editAccount, deleteAccount } = require("../controllers/account");
const usersAuthMiddleware = require("../middleware/usersAuth");
const router = express.Router();

router.get("/", usersAuthMiddleware, getAccount);
router.patch("/", usersAuthMiddleware, validatorEditAcctount, editAccount);
router.delete("/", usersAuthMiddleware, validatorDeleteAccount, deleteAccount)
module.exports = router;