const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Departamento', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    capacidad: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    disponibilidad: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    direccion: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [8, 100],
      },
    },
    habitaciones: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    precio: {
      type: Sequelize.FLOAT,
      allowNull: false,
    },
    descripcion: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        len: [8, 100],
      },
    },
  }, {
    underscored: true,
    paranoid: true,
  });
};
