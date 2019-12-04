'use strict';
//Need bcryptjs npm for password protection
var bcrypt = require("bcryptjs");

//Creating the user model
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    // None of the fields can be null and a proper email must be provided in order to create a user
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          args: true,
          msg: "Email must have valid format (Ex: janedoe@gmail.com)."
        }
      },
      sanitizer: {
        normalizeEmail: {
          all_lowercase: true
        }
      }
    },
    // Password must be between 8 and 120 characters in length
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [8, 120],
          msg: "Password must be between 8 and 120 characters in length."
        }
      }
    },
  }, {});

  //Checking capability of comparing unhashed password to hashed password in the db
  User.prototype.goodPass = (password) => {
    return bcrypt.compareSync(password, this.password);
  };

  // Hook to hash the password before creating a user
  User.addHook("beforeCreate", (user) => {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(13));
  });

  User.associate = function(models) {
    // associations can be defined here
  };

  return User;
};