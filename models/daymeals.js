'use strict';
module.exports = (sequelize, DataTypes) => {
  const DayMeals = sequelize.define('DayMeals', {
    dayId: DataTypes.INTEGER,
    mealId: DataTypes.INTEGER
  }, {});
  DayMeals.associate = function(models) {
    // associations can be defined here
  };
  return DayMeals;
};