const Sequelize = require('sequelize')

module.exports = (sequelize,DataTypes) => {
    return sequelize.define('user', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        rut: {
            type: Sequelize.INTEGER,
            required: true,
            allowNull: false
        },
        nombre_completo: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            len: [8,100]
        },
        numero_telefono: {
            type: Sequelize.INTEGER,
            required: false,
            allowNull: true
        },
        correo: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            len: [8,20]
        },
        password: {
            type: Sequelize.STRING,
            required: true,
            allowNull: false,
            len: [8,100]
        }

    },{
        underscored: true,
        paranoid: true
    })
}