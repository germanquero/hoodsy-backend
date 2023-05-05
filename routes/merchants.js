const express = require("express");
const router = express.Router();
const {
  createMerchant,
  getMerchants,
  getMerchant,
  editMerchant,
  deleteMerchant,
} = require("../controllers/merchants");
const { validatorMerchant } = require("../validators/merchants");
const { adminsAuthMiddleware } = require("../middleware/authMiddleware");

router.post("/", adminsAuthMiddleware, validatorMerchant, createMerchant);
router.get("/", adminsAuthMiddleware, getMerchants);
router.get("/:id", adminsAuthMiddleware, getMerchant);
router.put("/:id", adminsAuthMiddleware, validatorMerchant, editMerchant);
router.delete("/:id", adminsAuthMiddleware, deleteMerchant);

module.exports = router;
