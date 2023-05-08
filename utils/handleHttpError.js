const sendSlackNotification = require("./handleSlack");

const handleHttpError = (res, err, message, code = 403) => {
  sendSlackNotification(err);
  res.status(code).send(message);
};

module.exports = { handleHttpError };
