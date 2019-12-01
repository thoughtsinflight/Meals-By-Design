'use strict';
module.exports = (sequelize, DataTypes) => {
  const MealIngredients = sequelize.define('MealIngredients', {
    mealId: DataTypes.INTEGER,
    ingredientId: DataTypes.INTEGER
  }, {});
  MealIngredients.associate = function(models) {
    // associations can be defined here
  };
  return MealIngredients;
};