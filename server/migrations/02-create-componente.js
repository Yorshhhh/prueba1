"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Componente", {
      num_componente: {
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cod_componente: {
        type: Sequelize.INTEGER,
        references: {
          model: "Codigo_Componente",
          key: "cod_componente",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      num_compra: {
        type: Sequelize.INTEGER,
      },
      descripcion: {
        type: Sequelize.STRING,
      },
      marca: {
        type: Sequelize.STRING,
      },
      cantidad: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("Componente");
  },
};
