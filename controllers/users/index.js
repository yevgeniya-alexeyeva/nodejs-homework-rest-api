const addUser = require("./signup");
const login = require("./login");
const logout = require("./logout");
const getCurrentUser = require("./get-current-user");
const updateSubscription = require("./updateSubscription");
const updateAvatar = require("./updateAvatar");

module.exports = {
  addUser,
  login,
  logout,
  getCurrentUser,
  updateSubscription,
  updateAvatar,
};
