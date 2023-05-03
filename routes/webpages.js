const express = require("express");
const { getPages, getPicture } = require("../controllers/webpages");
const { validatorGetPicture } = require("../validators");
const router = express.Router();

router.get("/", getPages);
router.get("/photos/:filename", validatorGetPicture, getPicture);

module.exports = router;
