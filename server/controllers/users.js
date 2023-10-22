const {create} = require('../services/users/create')
const { findByUserRut,findAll} = require('../services/users/find')


async function _create(user){
    return await create(user)
}
async function _findByUserRut(rut){
    return await findByUserRut(rut)
}
async function _findAll(){
    return await findAll()
}
module.exports = {
    _create,
    _findByUserRut,
    _findAll
}