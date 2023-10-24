const {DataTypes, Sequelize} = require('sequelize');

module.exports = (sequelize) => {
    //?DEFINIMOS EL MODELO
    sequelize.define('posts',{
        id:{
            type:DataTypes.UUID,
            allowNull:false,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4
        },
        Title:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        Creator:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        Date:{
            type:DataTypes.DATEONLY,
            allowNull:false,
        },
        Image:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        Text:{
            type:DataTypes.TEXT,
            allowNull:true,
        },
    });
};