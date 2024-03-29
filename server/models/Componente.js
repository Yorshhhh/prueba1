"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Componente extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Componente.belongsTo(models.Codigo_Componente, {
        foreignKey: "cod_componente",
        targetKey: "cod_componente",
      });

      Componente.belongsToMany(models.Computador, {
        through: "Compu_Compo",
        foreignKey: "num_componente",
        targetKey: "num_componente",
      });
      Componente.belongsToMany(models.Usuario, {
        through: "Usuario_Compra_Componente",
        foreignKey: "num_componente",
        targetKey: "rut",
      });
    }
  }
  Componente.init(
    {
      num_componente: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      cod_componente: DataTypes.INTEGER,
      num_compra: DataTypes.INTEGER,
      descripcion: DataTypes.STRING,
      marca: DataTypes.STRING,
      cantidad: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Componente",
      tableName: "Componente",
      freezeTableName: true,
    }
  );
  return Componente;
};
