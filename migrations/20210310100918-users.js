

'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.addColumn('users', 'role' , {
     
        type:DataTypes.STRING,
        unique:false

    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.removeColumn('users' , 'role' );
  }
};