const express = require("express");
const { usersAuthMiddleware } = require("../middleware/authMiddleware");
const {
  getAccount,
  editAccount,
  deleteAccount,
  verifyPasswordChange,
  passwordChange,
} = require("../controllers/account");
const { validatorPassword, validatorInfo } = require("../validators/users");
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

module.exports = router;
