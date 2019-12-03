'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('Ingredients', [{
      name: 'flour',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'eggs',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'butter',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'sugar',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'peanut butter',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */

    return queryInterface.bulkDelete('Ingredients', null, {});
  }
};
