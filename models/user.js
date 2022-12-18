'use strict';
const { Model } = require('sequelize');

const bcrypt = require('bcrypt');

const hashPassword = (pass) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(pass, salt);

  return hash
}

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Product, { foreignKey: 'user_id' });
      User.hasMany(models.UserVoucher, { foreignKey: 'user_id' });
    }
  }
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter your name'
        },
        notNull: {
          msg: 'Please enter your name'
        },
        len: {
          args: [3, 255],
          msg: "Name must be 3 or more characters"
        },
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email already exists'
      },
      validate: {
        notEmpty: {
          msg: 'Please enter your email'
        },
        notNull: {
          msg: 'Please enter your name'
        },
        isEmail: {
          args: true,
          msg: "Email must be valid email"
        }
      }
    },
    emailVerifiedAt: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter your password'
        },
        notNull: {
          msg: 'Please enter your name'
        },
        len: {
          args: [6, 255],
          msg: "Password must be 6 or more characters"
        }
      }
    },
    role: DataTypes.STRING,
    refreshToken: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });

  // User.associate = function (models) {
  //   User.hasMany(models.Product, { foreignKey: 'user_id' });
  // }

  User.addHook('afterValidate', (user, options) => {
    // Todo: ni harusnya terjadi ketika validasi bukan beforecreate
    // if (user.password !== user.passwordConfirmation) {
    //   const error = {
    //     "errors": [
    //       {
    //         "path": "password",
    //         "message": "Password and password confirmation must be same"
    //       }
    //     ]
    //   }
    //   throw error
    // }
    user.password = hashPassword(user.password)
  })

  return User;
};