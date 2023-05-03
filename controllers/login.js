const { matchedData } = require("express-validator");
const { tokenUserSign } = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleHttpError");
const { encrypt, compare } = require("../utils/handlePassword");
const { usersModel } = require("../models");

const registerUser = async (req, res) => {
  try {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password };
    const dataUser = await usersModel.create(body);
    dataUser.set("password", undefined, { strict: false });
    res.send(dataUser);
  } catch (err) {
    handleHttpError(res, "ERROR_REGISTER_USER");
  }
};

const loginUser = async (req, res) => {
  try {
    req = matchedData(req);
    var user;
    process.env.ENGINE_DB === "nosql"
      ? (user = await usersModel
          .findOne({ email: req.email })
          .select("password name email"))
      : (user = await usersModel.findOne({ email: req.email }));

    if (!user) {
      handleHttpError(res, "USER_NOT_EXISTS", 404);
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
      token: await tokenUserSign(user),
      user,
    };

    res.send(data);
  } catch (err) {
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};

module.exports = { registerUser, loginUser };
