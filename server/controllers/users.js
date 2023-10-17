const {create} = require('../services/users/create')
const { findByUserRut} = require('../services/users/find')

async function _create(user){
    return await create(user)
}
async function _findByUserRut(rut){
    return await findByUserRut(rut)
}
module.exports = {
    _create,
    _findByUserRut
}