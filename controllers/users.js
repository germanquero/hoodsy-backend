const { handleHttpError } = require("../utils/handleHttpError");
const { userModel } = require("../models");

const getUser = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id);
    user.set("password", undefined, { strict: false });
    user.set("email", undefined, { strict: false });
    user.set("allowsReceivingOffers", undefined, { strict: false });
    res.send(user);
  } catch (err) {
    console.log(err);
    handleHttpError(res, err, "ERROR_GET_USER");
  }
};

module.exports = { getUser };
