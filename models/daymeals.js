'use strict';
module.exports = (sequelize, DataTypes) => {
  const DayMeals = sequelize.define('DayMeals', {
    DayId: DataTypes.INTEGER,
    MealId: DataTypes.INTEGER
  }, {});
  DayMeals.associate = function(models) {
    // associations can be defined here
  };
  return DayMeals;
};