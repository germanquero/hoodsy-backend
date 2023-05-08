const models = {
  userModel: require("./nosql/users"),
  adminModel: require("./nosql/admins"),
  merchantModel: require("./nosql/merchants"),
  pageModel: require("./nosql/pages"),
};

module.exports = models;
