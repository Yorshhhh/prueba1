"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Codigo_Componente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Codigo_Componente.hasMany(models.Componente, {
        foreignKey: "cod_componente",
      });
    }
  }
  Codigo_Componente.init(
    {
      cod_componente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      nombre_componente: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      sequelize,
      modelName: "Codigo_Componente",
      freezeTableName: true,
      tableName: "Codigo_Componente"
    }
  );
  return Codigo_Componente;
};
