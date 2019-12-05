'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserDayMeals = sequelize.define('UserDayMeals', {
    UserId: DataTypes.INTEGER,
    DayId: DataTypes.INTEGER,
    MealId: DataTypes.INTEGER
  }, {});
  UserDayMeals.associate = function(models) {
    // associations can be defined here
  };
  return UserDayMeals;
};