const db = require("../../models");

async function findByUserRut(rut) {
  return await db.user.findOne({
    where: {
      rut,
    },
  });
}
async function findByUserEmail(correo){
  return await db.user.findOne({
    where:{
      correo,
    },
  })
}


async function findAll() {
  return await db.user.findAll({
    attributes: { exclude: ["password"] },
  });
}

module.exports = {
  findByUserRut,
  findByUserEmail,
  findAll,
};
