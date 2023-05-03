const { matchedData } = require("express-validator");
const { merchantsModel, pagesModel } = require("../models");
const { handleHttpError } = require("../utils/handleHttpError");
const { tokenMerchantSign } = require("../utils/handleJwt");
const fs = require("fs");
const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = __dirname + "/../storage";

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

// Merchants

// router.get("/", merchantsAuthMiddleware, getInfo);
const getInfo = async (req, res) => {
  try {
    const data = {
      token: await tokenMerchantSign(req.merchant),
      merchant: req.merchant,
    };
    res.send(data);
  } catch (err) {
    handleHttpError(res, "ERROR_GET_INFO");
  }
};

// router.put("", merchantsAuthMiddleware, validatorRegisterMerchant, editInfo);
const editInfo = async (req, res) => {
  try {
    const id = req.merchant.id;
    const body = matchedData(req);
    const merchant = await merchantsModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    const data = {
      token: await tokenMerchantSign(merchant),
      merchant: merchant,
    };
    res.send(data);
  } catch (err) {
    handleHttpError(res, "ERROR_EDIT_INFO");
  }
};

// router.delete("/", merchantsAuthMiddleware, deleteMerchant);
const deleteMerchant = async (req, res) => {
  try {
    const merchantDeleted = req.merchant;
    const merchantData = await merchantsModel.delete({ _id: merchantDeleted.id });
    const pageData = await pagesModel.delete({ _id: merchantDeleted.page });
    const data = {
      merchant: merchantData,
      page: pageData,
    };
    res.send(data);
  } catch (err) {
    handleHttpError(res, "ERROR_DELETE_MERCHANT");
  }
};

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

// Pages

// router.get("/page", merchantsAuthMiddleware, getPage);
const getPage = async (req, res) => {
  try {
    const id = req.merchant.page;
    const page = await pagesModel.findById(id);
    res.send(page);
  } catch (err) {
    handleHttpError(res, "ERROR_GET_PAGE");
  }
};

// router.post("/page/publish", merchantsAuthMiddleware, postPage);
const postPage = async (req, res) => {
  try {
    const id = req.merchant.page;
    const updatedPage = await pagesModel.findByIdAndUpdate(
      id,
      {
        published: true,
      },
      { new: true }
    );
    res.send(updatedPage);
  } catch (err) {
    handleHttpError(res, "ERROR_POST_PAGE");
  }
};

// router.delete("/page/publish", merchantsAuthMiddleware, removePage);
const removePage = async (req, res) => {
  try {
    const id = req.merchant.page;
    const updatedPage = await pagesModel.findByIdAndUpdate(
      id,
      {
        published: false,
      },
      { new: true }
    );
    res.send(updatedPage);
  } catch (err) {
    handleHttpError(res, "ERROR_REMOVE_PAGE");
  }
};

// router.patch("/page", merchantsAuthMiddleware, validatorGetPage, validatorEditPage, editPage);
const editPage = async (req, res) => {
  try {
    const id = req.merchant.page;
    const { body } = matchedData(req);
    const dataPage = await pagesModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    res.send(dataPage);
  } catch (err) {
    handleHttpError(res, "ERROR_EDIT_PAGE");
  }
};

// router.post("/page/texts", merchantsAuthMiddleware, validatorAddTexts, addTexts);
const addTexts = async (req, res) => {
  try {
    const id = req.merchant.page;
    const body = matchedData(req);
    const dataPage = await pagesModel.findById(id);
    const updatedTexts = [...dataPage.texts, ...body.texts];
    const updatedPage = await pagesModel.findByIdAndUpdate(
      id,
      { texts: updatedTexts },
      { new: true }
    );

    res.send(updatedPage);
  } catch (err) {
    handleHttpError(res, "ERROR_ADD_PAGE");
  }
};

// router.delete("/page/texts", merchantsAuthMiddleware, validatorAddTexts, removeTexts);
const removeTexts = async (req, res) => {
  try {
    const id = req.merchant.page;
    const body = matchedData(req);
    const dataPage = await pagesModel.findById(id);
    const updatedTexts = dataPage.texts.filter(
      (text) => !body.texts.includes(text)
    );
    const updatedPage = await pagesModel.findByIdAndUpdate(
      id,
      { texts: updatedTexts },
      { new: true }
    );

    res.send(updatedPage);
  } catch (err) {
    handleHttpError(res, "ERROR_REMOVE_TEXTS");
  }
};

const uploadPhoto = async (req, res) => {
  try {
    const id = req.merchant.page;
    const { file } = req;
    const url =
      PUBLIC_URL + "/webpages/photos/" + file.filename;
    const dataPage = await pagesModel.findById(id);
    const updatedPictures = [...dataPage.pictures, url];
    const updatedPage = await pagesModel.findByIdAndUpdate(
      id,
      { pictures: updatedPictures },
      { new: true }
    );
    res.send(updatedPage);
  } catch (err) {
    handleHttpError(res, "ERROR_UPLOAD_PHOTO");
  }
};

const getPicture = async (req, res) => {
  try {
    const filename = matchedData(req).filename;
    const filePath = MEDIA_PATH + "/" + filename;
    res.set("Content-Type", "image/jpeg");
    res.set("Content-Disposition", "inline");
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  } catch (err) {
    handleHttpError(res, "ERROR_GET_PICTURE");
  }
};

const deletePhoto = async (req, res) => {
  try {
    const id = req.merchant.page;
    const filename = matchedData(req).filename;
    const filePath = MEDIA_PATH + "/" + filename;
    fs.unlinkSync(filePath);
    const url =
      process.env.PUBLIC_URL + "/merchants/page/photos/" + filename;
    const dataPage = await pagesModel.findById(id);
    const updatedPictures = dataPage.pictures.filter(
      (pictureUrl) => pictureUrl !== url
    );
    const updatedPage = await pagesModel.findByIdAndUpdate(
      id,
      { pictures: updatedPictures },
      { new: true }
    );
    res.send(updatedPage);
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_DELETE_PHOTO");
  }
};

module.exports = {
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
  getPicture,
  deletePhoto,
};
