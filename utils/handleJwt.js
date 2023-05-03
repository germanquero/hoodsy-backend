const jwt = require("jsonwebtoken");

const infiniteTokenSign = async (user) => {
  const sign = jwt.sign(
    {
      _id: user._id,
    },
    process.env.JWT_SECRET
  );
  return sign;
};

const temporalTokenSign = async (user) => {
  const sign = jwt.sign(
    {
      _id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "12h",
    }
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

module.exports = { infiniteTokenSign, temporalTokenSign, verifyToken };
