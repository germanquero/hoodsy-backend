const jwt = require("jsonwebtoken");

const tokenAdminSign = async (admin) => {
  const sign = jwt.sign(
    {
      _id: admin._id,
      forename: admin.forename,
      surename: admin.surename,
      email: admin.email,
      phoneNumber: admin.phoneNumber,
    },
    process.env.JWT_SECRET
  );
  return sign;
};

const tokenMerchantSign = async (merchant) => {
  const sign = jwt.sign(
    {
      _id: merchant._id,
      name: merchant.name,
      cif: merchant.cif,
      address: merchant.address,
      phoneNumber: merchant.phoneNumber,
      page: merchant.page,
    },
    process.env.JWT_SECRET
  );
  return sign;
};

const verifyToken = async (tokenJwt) => {
  try {
    return jwt.verify(tokenJwt, process.env.JWT_SECRET);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { tokenAdminSign, tokenMerchantSign, verifyToken };
