const getModels = require("./get.models");
const getInfo = require("./get.info");
const changeInfo = require("./change.info");
const deleteInfo = require("./delete.info");
const take_order = require("./take.order");

module.exports = {
  getModels: getModels,
  getInfo: getInfo,
  changeInfo: changeInfo,
  deleteInfo: deleteInfo,
  take_order: take_order,
};
