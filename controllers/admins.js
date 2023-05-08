const { matchedData } = require("express-validator");
const { infiniteTokenSign } = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleHttpError");
const { adminModel } = require("../models");

const createAdmin = async (req, res) => {
  try {
    const body = matchedData(req);
    const admin = await adminModel.create(body);
    const token = await infiniteTokenSign(admin);
    res.send(token);
  } catch (err) {
    console.log(err);
    handleHttpError(res, err, "ERROR_CREATE_ADMIN");
  }
};

const getAdmins = async (req, res) => {
  try {
    const dataAdmins = await adminModel.find({});
    res.send(dataAdmins);
  } catch (err) {
    console.log(err);
    handleHttpError(res, err, "ERROR_GET_ADMINS");
  }
};

const getAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const admin = await adminModel.findById(id);
    const data = {
      token: await infiniteTokenSign(admin),
      data: admin,
    };
    res.send(data);
  } catch (err) {
    console.log(err);
    handleHttpError(res, err, "ERROR_GET_ADMIN");
  }
};

const editAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    const body = matchedData(req);
    await adminModel.findByIdAndUpdate(id, body);
    res.send("OK");
  } catch (err) {
    console.log(err);
    handleHttpError(res, err, "ERROR_EDIT_ADMIN");
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const id = req.params.id;
    await adminModel.deleteOne({ _id: id });
    res.send("OK");
  } catch (err) {
    console.log(err);
    handleHttpError(res, err, "ERROR_DELETE_ADMIN");
  }
};

module.exports = { createAdmin, getAdmins, getAdmin, editAdmin, deleteAdmin };
