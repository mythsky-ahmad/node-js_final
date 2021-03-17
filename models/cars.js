'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class cars extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({users}) {
      // define association here
      this.belongsTo(users , {foreignKey: 'userid'} , this.max)
    }
  };
  cars.init({
    carName:{
      type:DataTypes.STRING,
      allowNull:false

    } ,
    model: {
      type:DataTypes.STRING,
      allowNull:false
    } ,
    userid:{
      type : DataTypes.INTEGER,
      allowNull:false
    } 
  }, {
    sequelize,
    modelName: 'cars',
    tableName:'cars'
  });
  return cars;
};