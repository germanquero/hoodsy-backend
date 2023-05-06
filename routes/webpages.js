const express = require("express");
const {
  usersAuthMiddleware,
  merchantsAuthMiddleware,
} = require("../middleware/authMiddleware");
const {
  validatorPage,
  validatorTexts,
  validatorReview,
} = require("../validators/pages");
const {
  publishPage,
  deletePage,
  editPage,
  postPhoto,
  deletePhoto,
  postTexts,
  deleteTexts,
  getPages,
  getPicture,
  postReview,
  deleteReview,
} = require("../controllers/pages");
const uploadMiddleware = require("../utils/handleStorage")

const router = express.Router();

router.post("/", merchantsAuthMiddleware, publishPage);
router.delete("/", merchantsAuthMiddleware, deletePage);
router.put("/", merchantsAuthMiddleware, validatorPage, editPage);
router.post("/photos", merchantsAuthMiddleware, uploadMiddleware.single("image"), postPhoto);
router.delete("/photos/:filename", merchantsAuthMiddleware, deletePhoto);
router.post("/texts", merchantsAuthMiddleware, validatorTexts, postTexts);
router.delete("/texts", merchantsAuthMiddleware, validatorTexts, deleteTexts);

router.get("/", getPages);
router.get("/photos/:filename", getPicture);

router.post("/review/:id", usersAuthMiddleware, validatorReview, postReview);
router.delete("/review/:id", usersAuthMiddleware, deleteReview);

module.exports = router;
