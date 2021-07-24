const register = require('./register')
const login = require('./login')
const proof_register = require('./proof.phone')

module.exports = {
    register: register,
    login: login,
    proof_register: proof_register
}
