const sequelize = require("../db.config");

const {DataTypes} = require("sequelize");


const Goods = sequelize.define('goods', {
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    name: {type:DataTypes.STRING, unique:true},
    price:{type:DataTypes.INTEGER},
    img:{type: DataTypes.STRING, allowNull:false}
})

const User = sequelize.define('user', {
    id:{type:DataTypes.INTEGER,primaryKey:true,autoIncrement:true},
    mail: {type:DataTypes.STRING, unique:true},
    password: {type:DataTypes.STRING},
    role: {type:DataTypes.STRING, defaultValue: "USER"}
})

module.exports = {
    Goods,
    User
}