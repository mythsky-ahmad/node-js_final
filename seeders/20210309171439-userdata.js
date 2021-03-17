'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users' , [{
      uuid : '8041c7f6-bf87-4998-a07c-6822852b8c0e',
      name: 'ahmadMAster',
      email:'ahmad@ahmnad.con',
      password:'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      role:'this is role',
      createdAt: new Date(),
      updatedAt: new Date()

    }])


    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     return queryInterface.bulkDelete('users', null, {});
  }
};
