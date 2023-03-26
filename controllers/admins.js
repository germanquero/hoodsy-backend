const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleHttpError");
const { adminsModel, merchantsModel, pagesModel } = require("../models");
const { tokenAdminSign, tokenMerchantSign } = require("../utils/handleJwt");

const createAdmin = async (req, res) => {
  try {
    const body = matchedData(req);
    const dataAdmin = await adminsModel.create(body);

    const data = {
      token: await tokenAdminSign(dataAdmin),
      admin: dataAdmin,
    };
    res.send(data);
  } catch (err) {
    handleHttpError(res, "ERROR_CREATE_ADMIN");
  }
};

const registerMerchant = async (req, res) => {
  try {
    const body = matchedData(req);
    const dataPage = await pagesModel.create({
      location: body.address,
      activity: "Commerce",
      title: body.name,
    });
    const dataMerchant = await merchantsModel.create({
      ...body,
      page: dataPage._id,
    });
    const data = {
      token: await tokenMerchantSign(dataMerchant),
      merchant: dataMerchant,
    };
    res.send(data);
  } catch (err) {
    handleHttpError(res, "ERROR_REGISTER_MERCHANT");
  }
};

module.exports = { createAdmin, registerMerchant };
