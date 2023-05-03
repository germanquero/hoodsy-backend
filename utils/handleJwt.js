const jwt = require("jsonwebtoken");

const tokenAdminSign = async (admin) => {
  const sign = jwt.sign(
    {
      _id: admin._id,
    },
    process.env.JWT_SECRET
  );
  return sign;
};

const tokenUserSign = async (user) => {
  const sign = jwt.sign(
    {
      _id: user._id,
      role: user.role
  },
  process.env.JWT_SECRET,
  {
      expiresIn: "12h"
  }
  );
  return sign;
}

const tokenMerchantSign = async (merchant) => {
  const sign = jwt.sign(
    {
      _id: merchant._id,
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

module.exports = { tokenAdminSign, tokenUserSign, tokenMerchantSign, verifyToken };
