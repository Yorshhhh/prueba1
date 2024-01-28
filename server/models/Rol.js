"use strict";
/* const db = require("../models/user") */

const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Rol extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Rol.hasMany(models.Usuario, {
        foreignKey: "cod_rol",
      });
    }
  }
  Rol.init(
    {
      cod_rol: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      rol: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Rol",
      tableName: "Rol",
      freezeTableName: true,
    }
  );
  return Rol;
};
