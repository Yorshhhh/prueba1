const db = require("../../models");

async function findByUserRut(rut) {
  return await db.user.findOne({
    where: {
      rut,
    },
  });
}
async function findAll() {
  return await db.user.findAll({
    attributes: { exclude: ["password"] },
  });
}
module.exports = {
  findByUserRut,
  findAll,
};
