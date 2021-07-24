const getUsers = require("./get.users");
const getInfo = require("./get.info");
const changeInfo = require("./change.info");
const deleteInfo = require("./delete.info");

module.exports = {
  getUsers: getUsers,
  getInfo: getInfo,
  changeInfo: changeInfo,
  deleteInfo: deleteInfo,
};
