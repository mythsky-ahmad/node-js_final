'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ users }) {
      // define association here
      this.belongsTo(users , {foreignKey : 'userid' })
    }

    toJSON(){
      return {...this.get() , id: undefined }
    }
  };
  Posts.init({
    body: {
      type:DataTypes.STRING,
      allowNull: false ,
    },
    uuid : {
      type : DataTypes.UUID,
      defaultValue : DataTypes.UUIDV4
    }
  }, {
    sequelize,
    modelName: 'Posts',
    tableName:'posts'
  });
  return Posts;
};