const { matchedData } = require("express-validator");
const { handleHttpError } = require("../utils/handleHttpError");
const { compare, encrypt } = require("../utils/handlePassword");
const { userModel } = require("../models");
const { verifyChangesTokenSign } = require("../utils/handleJwt");
const { verifyToken } = require("../utils/handleJwt");
const { findByIdAndUpdate } = require("../models/nosql/users");


/**
 * Gets account info
 * @param {*} req 
 * @param {*} res 
 */
const getAccount = async (req, res) => {
  try {
    const user = req.user;
    user.set("password", undefined, { strict: false });
    res.send(user);
  } catch (err) {
    console.log(err);
    handleHttpError(res, err, "ERROR_GET_ACCOUNT");
  }
};

/**
 * Edits account info
 * @param {*} req 
 * @param {*} res 
 */
const editAccount = async (req, res) => {
  try {
    const user = req.user;
    const body = matchedData(req);
    await userModel.findByIdAndUpdate(user.id, body, {
      new: true,
    });
    res.send("OK");
  } catch (err) {
    console.log(err);
    handleHttpError(res, err, "ERROR_EDIT_ACCOUNT");
  }
};

/**
 * Deletes account info
 * @param {*} req 
 * @param {*} res 
 */
const deleteAccount = async (req, res) => {
  try {
    const user = req.user;
    const body = matchedData(req);
    const hashPassword = user.password;
    const check = await compare(body.password, hashPassword);
    if (!check) {
      throw new Error("Incorrect Password");
    }
    await userModel.deleteOne(user._id);
    res.send("OK");
  } catch (err) {
    console.log(err);
    handleHttpError(res, err, "ERROR_DELETE_ACCOUNT");
  }
};

/**
 * Sends temporary link for password change
 * @param {*} req 
 * @param {*} res 
 */
const verifyPasswordChange = async (req, res) => {
  try {
    const user = req.user;
    const token = await verifyChangesTokenSign(user);
    const url = process.env.PUBLIC_URL + "/account/change-password/" + token;
    res.send(url);
  } catch (err) {
    console.log(err);
    handleHttpError(res, err, "ERROR_VERIFY_PASSWORD_CHANGE");
  }
};

/**
 * Handles temporary link for password change
 * @param {*} req 
 * @param {*} res 
 */
const passwordChange = async (req, res) => {
  try {
    const user = req.user;
    const decoded = await verifyToken(req.params.token);
    if (decoded.change != process.env.PASS_SECRET) {
      throw new Error("Not a pass change token");
    }

    if (decoded._id != user.id) {
      throw new Error("Unmaching tokens");
    }

    const newPassword = matchedData(req).password;
    const hashed = await encrypt(newPassword);
    await userModel.findByIdAndUpdate(user.id, { password: hashed });
    res.send("OK");
  } catch (err) {
    console.log(err);
    handleHttpError(res, err, "ERROR_PASSWORD_CHANGE");
  }
};

/**
 * Changes email
 * @param {*} req 
 * @param {*} res 
 */
const changeEmail = async (req, res) => {
  try {
    const user = req.user;
    const body = matchedData(req);
    const hashPassword = user.password;
    const check = await compare(body.password, hashPassword);
    if (!check) {
      throw new Error("Incorrect Password");
    }
    await userModel.findByIdAndUpdate(user.id, { email: body.email });
    res.send("OK");
  } catch (err) {
    console.log(err);
    handleHttpError(res, err, "ERROR_CHANGE_EMAIL");
  }
};

module.exports = {
  getAccount,
  editAccount,
  deleteAccount,
  verifyPasswordChange,
  passwordChange,
  changeEmail,
};
