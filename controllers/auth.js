const { matchedData } = require("express-validator");
const { tokenSign } = require("../utils/handleJwt");
const { encrypt, compare } = require("../utils/handlePassword");
const { handleHttpError } = require("../utils/handleHttpError");
const { usersModel } = require("../models");

const registerCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password };
    const dataUser = await usersModel.create(body);
    dataUser.set("password", undefined, { strict: false }); // preguntar por esto, porque a undefined, porque strict: false, no entiendo

    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };
    res.send(data);
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_REGISTER_USER");
  }
};

const loginCtrl = async (req, res) => {
  try {
    req = matchedData(req);
    const user = await usersModel
      .findOne({ email: req.email })
      .select("password name role email");
    if (!user) {
      handleHttpError(res, "USER_DONT_EXIST", 404);
      return;
    }

    const hashPassword = user.password;
    const check = await compare(req.password, hashPassword);

    if (!check) {
      handleHttpError(res, "INVALID_PASSWORD", 401);
      return;
    }

    user.set("password", undefined, { strict: false });
    const data = {
      token: await tokenSign(user),
      user,
    };

    res.send(data);
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};

const editCtrl = async (req, res) => {
  try {
    const {id, ...body} = matchedData(req);
    const password = await encrypt(body.password);
    const userData = { ...body, password };
    const data = await usersModel.findOneAndUpdate({_id:id}, userData);
    res.send(data);
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_EDIT_USER");
  }
};

module.exports = { registerCtrl, loginCtrl, editCtrl };
