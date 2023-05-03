const { handleHttpError } = require("../utils/handleHttpError");
const { verifyToken } = require("../utils/handleJwt");
const { usersModel } = require("../models");

const usersAuthMiddleware = async (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      handleHttpError(res, "NOT_TOKEN", 401);
      return;
    }
    const token = req.headers.authorization.split(' ').pop()
    const dataToken = await verifyToken(token)
    if(!dataToken._id){
        handleHttpError(res, 'ERROR_ID_TOKEN', 401);
        return;
    }

    const user = await usersModel.findById(dataToken._id)
    req.user = user
    next()
  } catch (err) {
    handleHttpError(res, "NOT_USER_SESSION", 401);
    return;
  }
};

module.exports = usersAuthMiddleware