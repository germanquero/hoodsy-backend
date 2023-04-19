const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleHttpError");
const { adminsModel, merchantsModel, pagesModel } = require("../models");
const { tokenAdminSign, tokenMerchantSign } = require("../utils/handleJwt");

// Admins

// router.post("/", adminsAuthMiddleware, validatorAdmin, createAdmin);
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

// router.get("/", adminsAuthMiddleware, getAdmins);
const getAdmins = async (req, res) => {
  try {
    const dataAdmins = await adminsModel.find({});
    const data = await Promise.all(
      dataAdmins.map(async (admin) => {
        const token = await tokenAdminSign(admin);
        return { ...admin.toObject(), token };
      })
    );
    res.send(data);
  } catch (err) {
    handleHttpError(res, "ERROR_GET_ADMINS");
  }
};

// router.get("/:id", adminsAuthMiddleware, validatorGetById, getAdmin);
const getAdmin = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const dataAdmin = await adminsModel.findById(id);
    const data = {
      token: await tokenAdminSign(dataAdmin),
      admin: dataAdmin,
    };
    res.send(data);
  } catch (err) {
    handleHttpError(res, "ERROR_GET_ADMIN");
  }
};

// router.delete("/", adminsAuthMiddleware, validatorGetById, deleteAdmin);
const deleteAdmin = async (req, res) => {
  try {
    const id = matchedData(req);
    const deletedAdmin = await adminsModel.deleteOne(id);
    res.send(deletedAdmin);
  } catch (err) {
    handleHttpError(res, "ERROR_DELETE_ADMIN");
  }
};

// router.put("/:id", adminsAuthMiddleware, validatorGetById, validatorAdmin, editAdmin);
const editAdmin = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    const admin = await adminsModel.findByIdAndUpdate(id, body);
    const updatedAdmin = await adminsModel.findById(id);
    const data = {
      token: await tokenAdminSign(updatedAdmin),
      admin: updatedAdmin,
    };
    res.send(data);
  } catch (err) {
    handleHttpError(res, "ERROR_EDIT_ADMIN");
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
// Merchants
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

const editMerchant = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    const dataMerchant = await merchantsModel.findByIdAndUpdate(id, body);
    const newMerchant = await merchantsModel.findById(id);
    const data = {
      token: await tokenMerchantSign(newMerchant),
      merchant: newMerchant,
    };
    res.send(data);
  } catch (err) {
    handleHttpError(res, "ERROR_EDIT_MERCHANT");
  }
};

const getMerchants = async (req, res) => {
  try {
    const data = await merchantsModel.find({});
    res.send(data);
  } catch (err) {
    handleHttpError(res, "ERROR_GET_MERCHANTS");
  }
};

const getMerchant = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const data = await merchantsModel.findById(id);
    res.send(data);
  } catch (err) {
    handleHttpError(res, "ERROR_GET_MERCHANT");
  }
};

const deleteMerchant = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const merchantDeleted = await merchantsModel.findById(id);
    const merchantData = await merchantsModel.delete({ _id: id });
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

module.exports = {
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
};
