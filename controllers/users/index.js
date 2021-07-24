const addUser = require("./signup");
const login = require("./login");
const logout = require("./logout");
const getCurrentUser = require("./get-current-user");

module.exports = {
  addUser,
  login,
  logout,
  getCurrentUser,
};
