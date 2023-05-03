const { matchedData } = require("express-validator");
const { temporalTokenSign } = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleHttpError");
const { encrypt, compare } = require("../utils/handlePassword");
const { userModel } = require("../models");

const registerUser = async (req, res) => {
  try {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password };
    const dataUser = await userModel.create(body);
    dataUser.set("password", undefined, { strict: false });
    res.send("User Registered");
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_REGISTER_USER");
  }
};

const loginUser = async (req, res) => {
  try {
    req = matchedData(req);
    var user;

    user = await userModel.findOne({ email: req.email });
    if (!user) {
      throw new Error("User not found");
    }

    const hashPassword = user.password;
    const check = await compare(req.password, hashPassword);

    if (!check) {
      throw new Error("Incorrect Password");
    }

    user.set("password", undefined, { strict: false });
    const data = {
      token: await temporalTokenSign(user),
    };

    res.send(data);
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_LOGIN_USER");
  }
};

module.exports = { registerUser, loginUser };
