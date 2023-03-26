const express = require("express");
const router = express.Router();
const { createAdmin, registerMerchant } = require("../controllers/admins");
const {
  validatorCreateAdmin,
  validatorRegisterMerchant,
} = require("../validators/admins");
const adminsAuthMiddleware = require("../middleware/adminAuth");

router.post("/", adminsAuthMiddleware, validatorCreateAdmin, createAdmin);
router.post(
  "/merchants",
  adminsAuthMiddleware,
  validatorRegisterMerchant,
  registerMerchant
);

module.exports = router;
