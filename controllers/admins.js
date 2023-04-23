const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleHttpError");
const { adminsModel, merchantsModel, pagesModel } = require("../models");
const { tokenAdminSign, tokenMerchantSign } = require("../utils/handleJwt");

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
    const updatedAdmin = await adminsModel.findByIdAndUpdate(id, body, {
      new: true,
    });
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
//
//

// Merchants

// router.post("/merchants", adminsAuthMiddleware, validatorRegisterMerchant, registerMerchant);
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

// router.put("/merchants/:id", adminsAuthMiddleware, validatorGetById, validatorRegisterMerchant, editMerchant);
const editMerchant = async (req, res) => {
  try {
    const { id, ...body } = matchedData(req);
    const dataMerchant = await merchantsModel.findByIdAndUpdate(id, body, {
      new: true,
    });
    const data = {
      token: await tokenMerchantSign(dataMerchant),
      merchant: dataMerchant,
    };
    res.send(data);
  } catch (err) {
    handleHttpError(res, "ERROR_EDIT_MERCHANT");
  }
};

// router.get("/merchants", adminsAuthMiddleware, getMerchants);
const getMerchants = async (req, res) => {
  try {
    const dataMerchants = await merchantsModel.find({});
    const data = await Promise.all(
      dataMerchants.map(async (merchant) => {
        const token = await tokenAdminSign(merchant);
        return { ...merchant.toObject(), token };
      })
    );
    res.send(data);
  } catch (err) {
    handleHttpError(res, "ERROR_GET_MERCHANTS");
  }
};

// router.get("/merchants/:id", adminsAuthMiddleware, validatorGetById, getMerchant);
const getMerchant = async (req, res) => {
  try {
    const { id } = matchedData(req);
    const dataMerchant = await merchantsModel.findById(id);
    const data = {
      token: await tokenMerchantSign(dataMerchant),
      merchant: dataMerchant,
    };
    re.send(data)
  } catch (err) {
    handleHttpError(res, "ERROR_GET_MERCHANT");
  }
};

// router.delete("/merchants/:id", adminsAuthMiddleware, validatorGetById, deleteMerchant);
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
