const Sequelize = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "user",
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
      },
      rut: {
        type: Sequelize.INTEGER,
        required: true,
        allowNull: false,
        primaryKey: true,
      },
      dv: {
        type: Sequelize.CHAR(1),
        required: true,
        allowNull: false,
      },
      nombres: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
        len: [8, 100],
      },
      apellidos: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
        len: [8, 100],
      },
      fecha_nacimiento: {
        type: Sequelize.DATE,
        required: true,
        allowNull: false,
      },
      numero_telefono: {
        type: Sequelize.INTEGER,
        required: false,
        allowNull: true,
      },
      correo: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
        len: [8, 30],
      },
      password: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
        len: [8, 100],
      },
      rol: {
        type: Sequelize.STRING,
        required: true,
        allowNull: false,
        defaultValue: "user",
        len: [3, 10],
      },
    },
    {
      underscored: true,
      paranoid: true,
    },
  );
};
