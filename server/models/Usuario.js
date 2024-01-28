"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Usuario.belongsTo(models.Rol, {
        foreignKey: "cod_rol",
        targetKey: "cod_rol",
      });
      Usuario.belongsToMany(models.Componente, {
        through: "Usuario_Compra_Componente",
        foreignKey: "rut", // Debe ser 'rut', ya que 'rut' es la clave principal de Usuario_Compra_Componente
        targetKey: "num_componente", // Debe ser 'num_componente', ya que 'num_componente' es la clave principal de Componente
      });
    }
  }
  Usuario.init(
    {
      rut: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      dv: DataTypes.INTEGER,
      nombres: DataTypes.STRING,
      apellidos: DataTypes.STRING,
      fecha_nacimiento: DataTypes.DATE,
      numero_telefono: DataTypes.INTEGER,
      correo: DataTypes.STRING,
      password: DataTypes.STRING,
      cod_rol: {
        type: DataTypes.INTEGER,
        /* defaultValue: 3 */
      },
    },
    {
      sequelize,
      modelName: "Usuario",
      tableName: "Usuario",
      freezeTableName: "true",
    }
  );
  return Usuario;
};
