const express = require("express");
const router = express.Router();
const {
  createAdmin,
  getAdmins,
  getAdmin,
  deleteAdmin,
  editAdmin,
  registerMerchant,
  editMerchant,
  getMerchants,
  getMerchant,
  deleteMerchant,
} = require("../controllers/admins");
const {
  validatorAdmin,
  validatorGetById,
  validatorRegisterMerchant,
} = require("../validators/admins");
const adminsAuthMiddleware = require("../middleware/adminAuth");

// Tabla de admins
// Crear, obetener todos, obtener por id, editar por id y destruir por id
router.post("/", adminsAuthMiddleware, validatorAdmin, createAdmin);
router.get("/", adminsAuthMiddleware, getAdmins);
router.get("/:id", adminsAuthMiddleware, validatorGetById, getAdmin);
router.delete("/", adminsAuthMiddleware, validatorGetById, deleteAdmin);
router.put(
  "/:id",
  adminsAuthMiddleware,
  validatorGetById,
  validatorAdmin,
  editAdmin
);

//
//
//
//
//
//
//
//
//
//
//
//
//
// Tabla Merchants y Pages
router.post(
  "/merchants",
  adminsAuthMiddleware,
  validatorRegisterMerchant,
  registerMerchant
);

router.put(
  "/merchants/:id",
  adminsAuthMiddleware,
  validatorGetById,
  validatorRegisterMerchant,
  editMerchant
);

router.get("/merchants", adminsAuthMiddleware, getMerchants);
router.get(
  "/merchants/:id",
  adminsAuthMiddleware,
  validatorGetById,
  getMerchant
);

router.delete(
  "/merchants/:id",
  adminsAuthMiddleware,
  validatorGetById,
  deleteMerchant
);

module.exports = router;
