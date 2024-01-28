"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Usuarios", {
      rut: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      dv: {
        type: Sequelize.INTEGER,
      },
      nombres: {
        type: Sequelize.STRING,
      },
      apellidos: {
        type: Sequelize.STRING,
      },
      fecha_nacimiento: {
        type: Sequelize.DATE,
      },
      numero_telefono: {
        type: Sequelize.INTEGER,
      },
      correo: {
        type: Sequelize.STRING,
      },
      password: {
        type: Sequelize.STRING,
      },
      cod_rol: {
        type: Sequelize.INTEGER,
        references: { model: "Rol", key: "cod_rol" },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Usuarios");
  },
};
