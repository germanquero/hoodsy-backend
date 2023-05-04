const express = require("express");
const { usersAuthMiddleware } = require("../middleware/authMiddleware");
const {
  getAccount,
  editAccount,
  deleteAccount,
  verifyPasswordChange,
  passwordChange,
  changeEmail,
} = require("../controllers/account");
const {
  validatorEmail,
  validatorPassword,
  validatorInfo,
} = require("../validators/users");
const router = express.Router();

router.get("/", usersAuthMiddleware, getAccount);
router.put("/", usersAuthMiddleware, validatorInfo, editAccount);
router.delete("/", usersAuthMiddleware, validatorPassword, deleteAccount);
router.post("/change-password", usersAuthMiddleware, verifyPasswordChange);
router.post(
  "/change-password/:token",
  usersAuthMiddleware,
  validatorPassword,
  passwordChange
);
router.post(
  "/change-email",
  usersAuthMiddleware,
  validatorEmail,
  validatorPassword,
  changeEmail
);

module.exports = router;
