const { matchedData } = require("express-validator");
const { tokenUserSign } = require("../utils/handleJwt");
const { compare } = require("../utils/handlePassword");
const { handleHttpError } = require("../utils/handleHttpError");
const { usersModel } = require("../models");

const getAccount = async (req, res) => {
  try {
    const user = req.user;
    user.set("password", undefined, { strict: false });
    res.send(user);
  } catch (err) {
    handleHttpError(res, "ERROR_GET_ACCOUNT");
  }
};

const editAccount = async (req, res) => {
  try {
    const user = req.user;
    const body = matchedData(req);
    const editedUser = await usersModel.findByIdAndUpdate(user.id, body, {
      new: true,
    });
    editedUser.set("password", undefined, { strict: false });
    const data = {
      token: await tokenUserSign(editedUser),
      user: editedUser,
    };
    res.send(data);
  } catch (err) {
    handleHttpError(res, "ERROR_EDIT_USER");
  }
};

const deleteAccount = async (req, res) => {
  try {
    const password = matchedData(req).password;
    const hashedPassword = req.user.password;
    const check = await compare(password, hashedPassword);
    if (!check) {
      handleHttpError(res, "INVALID_PASSWORD", 401);
      return;
    }
    const deletedUser = await usersModel.findByIdAndDelete(req.user.id);
    deletedUser.set("password", undefined, { strict: false });
    res.send(deletedUser);
  } catch (err) {
    handleHttpError(res, "ERROR_DELETE_USER");
  }
};

module.exports = { getAccount, editAccount, deleteAccount };
