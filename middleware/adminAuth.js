const { handleHttpError } = require("../utils/handleHttpError");
const { verifyToken } = require("../utils/handleJwt");
const { adminsModel } = require("../models");

const adminsAuthMiddleware = async (req, res, next) => {
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

    const admin = await adminsModel.findById(dataToken._id)
    req.admin = admin
    next()
  } catch (err) {
    handleHttpError(res, "NOT_ADMIN_SESSION", 401);
    return;
  }
};

module.exports = adminsAuthMiddleware
