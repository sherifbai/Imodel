const getAgents = require('./get.agents')
const getInfo = require('./get.info')
const changeInfo = require('./change.info')
const deleteInfo = require('./delete.info')
const checkMyRef = require('./check.ref')

module.exports = {
    getAgents: getAgents,
    getInfo: getInfo,
    changeInfo: changeInfo,
    checkMyRef: checkMyRef,
    deleteInfo: deleteInfo
}