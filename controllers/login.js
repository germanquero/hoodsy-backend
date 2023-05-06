const { matchedData } = require("express-validator");
const { temporalTokenSign, verifyForgotPasswordTokenSign, verifyToken } = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleHttpError");
const { encrypt, compare } = require("../utils/handlePassword");
const { userModel } = require("../models");

const registerUser = async (req, res) => {
  try {
    req = matchedData(req);
    const password = await encrypt(req.password);
    const body = { ...req, password };
    await userModel.create(body);
    res.send("OK");
  } catch (err) {
    console.log(err);
    handleHttpError(res, err, "ERROR_REGISTER_USER");
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
    const token = await temporalTokenSign(user);
    res.send(token);
  } catch (err) {
    console.log(err);
    handleHttpError(res, err, "ERROR_LOGIN_USER");
  }
};

const forgotPassword = async(req, res) => {
  try{
    const body = matchedData(req);
    user = await userModel.findOne({ email: body.email });
    if (!user) {
      throw new Error("User not found");
    }
    const token = await verifyForgotPasswordTokenSign(body.email);
    const url = process.env.PUBLIC_URL + "/login/forgot-password/" + token;
    res.send(url);
  } catch(err) {
    console.log(err);
    handleHttpError(res, err, "ERROR_FORGOT_PASSWORD");
  }
}

const changeForgotPassword = async(req, res) => {
  try{
    const decoded = await verifyToken(req.params.token);
    if(decoded.change != process.env.PASS_SECRET){
      throw new Error("Not a pass change token");
    }
    const newPassword = matchedData(req).password;
    const hashed = await encrypt(newPassword);
    await userModel.findOneAndUpdate({ email: decoded.email }, {password: hashed});
    res.send("OK");

  } catch(err) {
    console.log(err);
    handleHttpError(res, err, "ERROR_CHANGE_FORGOT_PASSWORD");
  }
}

module.exports = { registerUser, loginUser, forgotPassword, changeForgotPassword };
