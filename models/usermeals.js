'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserMeals = sequelize.define('UserMeals', {
    UserId: DataTypes.INTEGER,
    MealId: DataTypes.STRING
  }, {});
  UserMeals.associate = function(models) {
    // associations can be defined here
  };
  return UserMeals;
};