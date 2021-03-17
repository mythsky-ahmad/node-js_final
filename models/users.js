'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Posts }) {
      // define association here
      this.hasMany(Posts , {foreignKey: 'userid'})
    }

    toJSON(){
      return {...this.get() , reefreshtoken:undefined} //, password:undefined 
    }
  };
  users.init(
    {
     uuid : {
       type : DataTypes.UUID,
       defaultValue : DataTypes.UUIDV4,
       validate:{
            isUUID: 4
       }
     },
    name: {
      type:DataTypes.STRING,
       allowNull : false,
       validate: {
        notNull:{msg: 'user must have a name '},
        notEmpty:{msg:'Name must not be empty'}
                },
    },
    email:{
      type:DataTypes.STRING,
       allowNull : false,
       unique:true ,
       validate:{
        isEmail:true, //{msg:'write a good email'}
        isLowercase:{msg : "the email must be lower case "}

                }
    },
    password:{
      type:DataTypes.STRING,
      allowNull:false,
      // validate:{
      //   is:/^[0-9a-f-/]{60}/i
      // }
      
    },
    role: {
      type:DataTypes.STRING,
    },
    reefreshtoken:{
      type:DataTypes.STRING,
      defaultValue : "DataTypes.UUIDV4",
      allowNull:false
      
    }
  },
  
  
  {
    sequelize,
    modelName: 'users',
    tableName:'users'
  });
  return users;
};
