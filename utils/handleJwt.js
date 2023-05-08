const jwt = require("jsonwebtoken");

const verifyForgotPasswordTokenSign = async (email) => {
  const sign = jwt.sign(
    {
      email: email,
      change: process.env.PASS_SECRET,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return sign;
};

const verifyChangesTokenSign = async (user) => {
  const sign = jwt.sign(
    {
      _id: user._id,
      change: process.env.PASS_SECRET,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return sign;
};

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

module.exports = {
  verifyForgotPasswordTokenSign,
  verifyChangesTokenSign,
  infiniteTokenSign,
  temporalTokenSign,
  verifyToken,
};
