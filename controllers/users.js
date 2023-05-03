const { matchedData } = require("express-validator");
const { tokenUserSign } = require("../utils/handleJwt");
const { encrypt, compare } = require("../utils/handlePassword");
const { handleHttpError } = require("../utils/handleHttpError");
const { usersModel } = require("../models");

const registerUser = async (req, res) => {
  try {
    req = matchedData(req);
    console.log(req)
    const password = await encrypt(req.password);
    console.log(password)
    const body = { ...req, password };
    console.log(body);
    const dataUser = await usersModel.create(body);
    console.log(dataUser);
    dataUser.set("password", undefined, { strict: false });
    const data = {  
      token: await tokenUserSign(dataUser),
      user: dataUser,
    };
    res.send(data);
  } catch (err) {
    handleHttpError(res, "ERROR_REGISTER_USER");
  }
};

const deleteUser = async (req, res) => {
    try{
        const user = req.user
        const deletedUser = await usersModel.findByIdAndDelete(user.id);
        res.send(deletedUser);
    } catch(err){
        handleHttpError(req, "ERROR_DELETE_USER");
    }
}

const editUser = async (req, res) => {
  try {
    const user = req.user
    const body = matchedData(req);
    const editedUser = await usersModel.findByIdAndUpdate(user.id, body, {new: true});
    const data = {  
      token: await tokenUserSign(editedUser),
      user: editedUser,
    };
    res.send(data);
  } catch (err) {
    handleHttpError(req, "ERROR_EDIT_USER");
  }
}

module.exports = { registerUser, deleteUser, editUser };
