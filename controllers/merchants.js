const { matchedData } = require("express-validator");
const { merchantsModel, pagesModel } = require("../models");
const { handleHttpError } = require("../utils/handleHttpError");

const getMerchants = async (req, res) => {
  try {
    const data = await merchantsModel.find({});
    res.send(data);
  } catch (err) {
    handleHttpError(res, "ERROR_GET_MERCHANTS");
  }
};

const editPage = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    const dataPage = await pagesModel.findByIdAndUpdate(id, body);
    const newPage = await pagesModel.findById(id);
    res.send(newPage);
  } catch (err) {
    handleHttpError(res, "ERROR_EDIT_PAGE");
  }
};

const addTexts = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    const dataPage = await pagesModel.findById(id);
    const updatedTexts = [...dataPage.texts, ...body.texts];
    const updatedPage = await pagesModel.findByIdAndUpdate(id, { texts: updatedTexts }, { new: true });

    res.send(updatedPage);
  } catch (err) {
    handleHttpError(res, "ERROR_EDIT_PAGE");
  }
};

module.exports = { editPage, getMerchants, addTexts };
