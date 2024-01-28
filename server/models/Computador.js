'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Computador extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Computador.belongsTo(models.Categoria,{
        foreignKey: 'cod_categoria',
        targetKey: 'cod_categoria'
      })
      Computador.belongsToMany(models.Componente,{
        through: 'Compu_Compo',
        foreignKey: 'cod_pc',
        targetKey: 'num_componente'
      })
    }
  }
  Computador.init({
    cod_pc: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    cod_categoria: DataTypes.INTEGER,
    num_componente: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    precio: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Computador',
    tableName: 'Computador',
    freezeTableName: true
  });
  return Computador;
};