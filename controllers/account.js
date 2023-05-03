const getAccount = async (req, res) => {
  try {
    const user = req.user;
    user.set("password", undefined, { strict: false });
    res.send(user);
  } catch (err) {
    handleHttpError(res, "ERROR_GET_ACCOUNT");
  }
};

module.exports = { getAccount };
