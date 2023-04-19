const express = require("express");
const router = express.Router();
const { getMerchants, editPage, addTexts } = require("../controllers/merchants");
const merchantsAuthMiddleware = require("../middleware/merchantsAuth");
const { validatorGetPage, validatorEditPage, validatorAddTexts } = require("../validators/merchants");

router.get("/", merchantsAuthMiddleware, getMerchants);
router.patch("/page/:id", merchantsAuthMiddleware, validatorGetPage, validatorEditPage, editPage);

router.post("/page/texts/:id", merchantsAuthMiddleware, validatorGetPage, validatorAddTexts, addTexts);

module.exports = router;
