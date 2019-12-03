'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('MealIngredients', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert('MealIngredients', [{
      mealId: 1,
      ingredientId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      mealId: 1,
      ingredientId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      mealId: 1,
      ingredientId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      mealId: 1,
      ingredientId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      mealId: 2,
      ingredientId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      mealId: 2,
      ingredientId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      mealId: 2,
      ingredientId: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      mealId: 2,
      ingredientId: 4,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      mealId: 2,
      ingredientId: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('MealIngredients', null, {});
    */
    return queryInterface.bulkDelete('MealIngredients', null, {});
  }
};
