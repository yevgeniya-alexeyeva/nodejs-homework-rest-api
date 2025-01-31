const addUser = require("./signup");
const login = require("./login");
const logout = require("./logout");
const getCurrentUser = require("./get-current-user");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");
const verify = require("./verify");
const sendVerifyEmail = require("./sendVerifyEmail");

module.exports = {
  addUser,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
  verify,
  sendVerifyEmail,
};
