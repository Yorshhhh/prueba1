const db = require('../../models')

async function findByUserRut(rut){
    return await db.user.findOne({
        where: {
            rut
        }
    })
}
module.exports = {
    findByUserRut
}