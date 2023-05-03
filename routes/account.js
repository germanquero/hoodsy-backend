const express = require("express");
const { usersAuthMiddleware } = require("../middleware/authMiddleware");
const { getAccount } = require("../controllers/account");

const router = express.Router();

router.get("/", usersAuthMiddleware, getAccount);

module.exports = router;
