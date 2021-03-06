'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert('Days', [{
      day: 'Monday',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      day: 'Tuesday',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      day: 'Wednesday',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      day: 'Thursday',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      day: 'Friday',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      day: 'Saturday',
      createdAt: new Date(),
      updatedAt: new Date()
    },{
      day: 'Sunday',
      createdAt: new Date(),
      updatedAt: new Date()
    },], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkDelete('Days', null, {});
  }
};
