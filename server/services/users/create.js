const db = require("../../models");
const bcrypt = require("bcrypt");

async function create(user) {
  return await db.user.create({
    ...user,
    password: bcrypt.hashSync(user.password, 10),
  });
}
module.exports = {
    create
}