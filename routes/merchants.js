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
  uploadPhoto,
  deletePhoto,
} = require("../controllers/merchants");
const merchantsAuthMiddleware = require("../middleware/merchantsAuth");
const {
  validatorEditPage,
  validatorAddTexts,
} = require("../validators/merchants");
const { validatorGetPicture } = require("../validators");
const { validatorRegisterMerchant } = require("../validators/admins");
const uploadMiddleware = require("../utils/handleStorage");

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
// textos
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
// Imagenes
router.post(
  "/page/photos",
  merchantsAuthMiddleware,
  uploadMiddleware.single("image"),
  uploadPhoto
);
router.delete(
  "/page/photos/:filename",
  merchantsAuthMiddleware,
  validatorGetPicture,
  deletePhoto
);
module.exports = router;
