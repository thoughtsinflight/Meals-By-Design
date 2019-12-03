'use strict';
module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: DataTypes.STRING
  }, {});
  Meal.associate = function(models) {
    // associations can be defined here
    Meal.belongsToMany(models.Ingredient, { through: 'MealIngredients', as: 'Ingredients' });
    Meal.belongsToMany(models.Day, { through: 'DayMeals', as: 'Day' });
  };
  return Meal;
};