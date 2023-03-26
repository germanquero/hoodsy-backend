const jwt = require("jsonwebtoken");

const tokenSign = async (admin) => {
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

module.exports = { tokenSign };
