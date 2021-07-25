const register = require("./register");
const login = require("./login");
const proof_register = require("./proof.phone");
const reseat_password = require("./reseat.password");

module.exports = {
  register: register,
  login: login,
  proof_register: proof_register,
  reseat_password: reseat_password,
};
