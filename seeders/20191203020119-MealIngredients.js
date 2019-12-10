'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkInsert('MealIngredients', [{
      MealId: 1,
      IngredientId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      MealId: 1,
      IngredientId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      MealId: 1,
      IngredientId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      MealId: 1,
      IngredientId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      MealId: 2,
      IngredientId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      MealId: 2,
      IngredientId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      MealId: 2,
      IngredientId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      MealId: 2,
      IngredientId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      MealId: 2,
      IngredientId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.
    */
    return queryInterface.bulkDelete('MealIngredients', null, {});
  }
};
