'use strict';
module.exports = (sequelize, DataTypes) => {
  const Day = sequelize.define('Day', {
    day: DataTypes.STRING
  }, {});
  Day.associate = function(models) {
    // associations can be defined here
    Day.belongsToMany(models.Meal, { through: 'DayMeals', as: 'Meal' });
  };
  return Day;
};