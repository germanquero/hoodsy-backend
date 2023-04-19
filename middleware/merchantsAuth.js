const { handleHttpError } = require("../utils/handleHttpError");
const { verifyToken } = require("../utils/handleJwt");
const { merchantsModel } = require("../models");

const merchantsAuthMiddleware = async (req, res, next) => {
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

    const merchant = await merchantsModel.findById(dataToken._id)
    req.merchant = merchant
    next()
  } catch (err) {
    handleHttpError(res, "NOT_MERCHANT_SESSION", 401);
    return;
  }
};

module.exports = merchantsAuthMiddleware
