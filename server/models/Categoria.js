"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Categoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Categoria.hasMany(models.Computador, {
        foreignKey: "cod_categoria",
      });
    }
  }
  Categoria.init(
    {
      cod_categoria: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nombre_categoria: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Categoria",
      tableName: "Categoria",
      freezeTableName: true,
    }
  );
  return Categoria;
};
