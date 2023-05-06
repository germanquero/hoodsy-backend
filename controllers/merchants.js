const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleHttpError");
const { infiniteTokenSign } = require("../utils/handleJwt");
const { merchantModel, pageModel } = require("../models");

const createMerchant = async (req, res) => {
  try {
    const body = matchedData(req);
    const dataPage = await pageModel.create({
      location: body.address,
      city: body.city,
      activity: "Commerce",
      title: body.name,
    });
    const dataMerchant = await merchantModel.create({
      ...body,
      page: dataPage._id,
    });
    const token = await infiniteTokenSign(dataMerchant);
    res.send(token);
  } catch (err) {
    console.log(err);
    handleHttpError(res, err, "ERROR_CREATE_MERCHANT");
  }
};
const getMerchants = async (req, res) => {
  try {
    const dataMerchants = await merchantModel.find({});
    res.send(dataMerchants);
  } catch (err) {
    console.log(err);
    handleHttpError(res, err, "ERROR_GET_MERCHANTS");
  }
};
const getMerchant = async (req, res) => {
  try {
    const id = req.params.id;
    const merchant = await merchantModel.findById(id);
    const data = {
      token: await infiniteTokenSign(merchant),
      data: merchant,
    };
    res.send(data);
  } catch (err) {
    console.log(err);
    handleHttpError(res, err, "ERROR_GET_MERCHANT");
  }
};
const editMerchant = async (req, res) => {
  try {
    const id = req.params.id;
    const body = matchedData(req);
    await merchantModel.findByIdAndUpdate(id, body);
    res.send("OK");
  } catch (err) {
    console.log(err);
    handleHttpError(res, err, "ERROR_EDIT_MERCHANT");
  }
};
const deleteMerchant = async (req, res) => {
  try {
    const id = req.params.id;
    const merchant = await merchantModel.findById(id);
    await pageModel.deleteOne({ _id: merchant.page });
    await merchantModel.deleteOne(merchant);
    res.send("OK");
  } catch (err) {
    console.log(err);
    handleHttpError(res, err, "ERROR_DELETE_MERCHANT");
  }
};

module.exports = {
  createMerchant,
  getMerchants,
  getMerchant,
  editMerchant,
  deleteMerchant,
};
