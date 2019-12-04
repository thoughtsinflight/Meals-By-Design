'use strict';
module.exports = (sequelize, DataTypes) => {
  const MealIngredients = sequelize.define('MealIngredients', {
    MealId: DataTypes.INTEGER,
    IngredientId: DataTypes.INTEGER
  }, {});
  MealIngredients.associate = function(models) {
    // associations can be defined here
  };
  return MealIngredients;
};