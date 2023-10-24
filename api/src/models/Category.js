const {DataTypes} = require('sequelize')
module.exports = (sequelize) => {
    //?DEFINIMOS EL MODELO
    sequelize.define('category',{
        id:{
            type:DataTypes.UUID,
            allowNull:false,
            primaryKey:true,
            defaultValue:DataTypes.UUIDV4
        },
        Description:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true,
        },
    });
};