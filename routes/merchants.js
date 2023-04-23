const express = require("express");
const router = express.Router();
const {
  getInfo,
  editInfo,
  deleteMerchant,
  getPage,
  postPage,
  removePage,
  editPage,
  addTexts,
  removeTexts,
} = require("../controllers/merchants");
const merchantsAuthMiddleware = require("../middleware/merchantsAuth");
const {
  validatorEditPage,
  validatorAddTexts,
} = require("../validators/merchants");
const { validatorRegisterMerchant } = require("../validators/admins");

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

// Tabla merchants
// Obtener y editar info y eliminar la cuenta del merchant correspondiente al token
router.get("/", merchantsAuthMiddleware, getInfo);
router.patch("/", merchantsAuthMiddleware, validatorRegisterMerchant, editInfo);
router.delete("/", merchantsAuthMiddleware, deleteMerchant);
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

// Tabla pages
// Obtener, publicar, ocultar y editar pagina correspondiente al merchant correspondiente al token
router.get("/page", merchantsAuthMiddleware, getPage);
router.post("/page/publish", merchantsAuthMiddleware, postPage);
router.delete("/page/publish", merchantsAuthMiddleware, removePage);
router.patch("/page", merchantsAuthMiddleware, validatorEditPage, editPage);
router.post(
  "/page/texts",
  merchantsAuthMiddleware,
  validatorAddTexts,
  addTexts
);
router.delete(
  "/page/texts",
  merchantsAuthMiddleware,
  validatorAddTexts,
  removeTexts
);

module.exports = router;
