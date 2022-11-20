const {DataTypes, UUIDV4} = require ('sequelize');

module.exports= (sequelize) => {
    sequelize.define('genre', {
        id:{
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING,
        }
    }, {
        timestamps: false,
    })
};