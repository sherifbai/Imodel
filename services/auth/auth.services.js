const register = require("./register");
const login = require("./login");
const proof_register = require("./proof.phone");
const reseat_password = require("./reseat.password");
const send_code = require("./send.code");
const discharge_password = require("./discharge.password");

module.exports = {
  register: register,
  login: login,
  proof_register: proof_register,
  reseat_password: reseat_password,
  send_code: send_code,
  discharge_password: discharge_password,
};
