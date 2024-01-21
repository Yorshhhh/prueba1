"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Computador", {
      cod_pc: {
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      cod_categoria: {
        type: Sequelize.INTEGER,
        references: {
          model: "Categoria",
          key: "cod_categoria",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      num_componente: {
        type: Sequelize.INTEGER,
        references: {
          model: "Componente",
          key: "num_componente",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
      descripcion: {
        type: Sequelize.STRING,
      },
      precio: {
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
    await queryInterface.dropTable("Computador");
  },
};
