const create_order = require("./create.order");
const get_active_orders = require("./get.active.orders");
const get_compete_orders = require("./get.complete.orders");
const get_info = require("./get.info");
const complete_order = require("./complete.order");
const update_info = require("./update.info");

module.exports = {
  create_order: create_order,
  get_active_orders: get_active_orders,
  complete_order: complete_order,
  get_compete_orders: get_compete_orders,
  get_info: get_info,
  update_info: update_info,
};
