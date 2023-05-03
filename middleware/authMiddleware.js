const { handleHttpError } = require("../utils/handleHttpError");
const { verifyToken } = require("../utils/handleJwt");
const { userModel } = require("../models");

const authMiddleware =
  (model, errorMessage, objectName) => async (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        handleHttpError(res, "NOT_TOKEN", 401);
        return;
      }
      const token = req.headers.authorization.split(" ").pop();
      const dataToken = await verifyToken(token);
      if (!dataToken._id) {
        handleHttpError(res, "ERROR_ID_TOKEN", 401);
        return;
      }

      const obj = await model.findById(dataToken._id);
      req[objectName] = obj;
      next();
    } catch (err) {
      handleHttpError(res, errorMessage, 401);
      return;
    }
  };

const usersAuthMiddleware = authMiddleware(
  userModel,
  "NOT_USER_SESSION",
  "user"
);

module.exports = { usersAuthMiddleware };


//   const adminsAuthMiddleware = authMiddleware(adminsModel, "NOT_ADMIN_SESSION", "admin");
