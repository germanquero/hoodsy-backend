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

const getUsers = async (req, res) => {
  try {
    const merchant = req.merchant;
    const activity = req.query.activity;
    const filter = {};
    filter.allowsReceivingOffers = true;
    filter.city = merchant.city;
    if (activity) {
      filter["interests"] = { $in: [activity] };
    }
    const query = userModel.find(filter);
    const users = await query.exec();
    const userMails = [];
    users.forEach((user) => userMails.push(user.email));
    res.send(userMails);
  } catch (err) {
    console.log(err);
    handleHttpError(res, err, "ERROR_GET_USER");
  }
};

module.exports = { getUser, getUsers };
