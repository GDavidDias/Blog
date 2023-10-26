const {DataTypes} = require('sequelize');

module.exports = (sequelize) =>{
    //?DEFINIMOS EL MODELO
    sequelize.define('user',{
        id:{
            type:DataTypes.UUID,
            allowNull:false,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
        }
    })
};