const express = require("express");
const router = express.Router();
const { validatorAdmin } = require("../validators/admins");
const {
  createAdmin,
  getAdmins,
  getAdmin,
  editAdmin,
  deleteAdmin,
} = require("../controllers/admins");
const { adminsAuthMiddleware } = require("../middleware/authMiddleware");

router.post("/", adminsAuthMiddleware, validatorAdmin, createAdmin);
router.get("/", adminsAuthMiddleware, getAdmins);
router.get("/:id", adminsAuthMiddleware, getAdmin);
router.put("/:id", adminsAuthMiddleware, validatorAdmin, editAdmin);
router.delete("/:id", adminsAuthMiddleware, deleteAdmin);

module.exports = router;
