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

// Tabla de admins
// Crear, obetener todos, obtener por id, destruir por id y editar por id
router.post("/admins", adminsAuthMiddleware, validatorAdmin, createAdmin);
router.get("/admins", adminsAuthMiddleware, getAdmins);
router.get("/admins/:id", adminsAuthMiddleware, validatorGetById, getAdmin);
router.delete("/admins", adminsAuthMiddleware, validatorGetById, deleteAdmin);
router.put(
  "/admins/:id",
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
// Registrar, editar por id, obtener todos, obtener por id y borrar por id
router.post(
  "/merchants",
  adminsAuthMiddleware,
  validatorRegisterMerchant,
  registerMerchant
);
router.patch(
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
