'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
  }
  Voucher.init({
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Code already exists'
      },
      validate: {
        notEmpty: {
          msg: 'Please enter voucher code'
        },
        notNull: {
          msg: 'Please enter voucher code'
        },
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter voucher name'
        },
        notNull: {
          msg: 'Please enter voucher name'
        }
      }
    },
    description: {
      type: DataTypes.STRING,
    },
    discount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: 'Price must be greater than 1'
        },
        max: {
          args: 100,
          msg: 'Price must be less than 100'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Voucher',
  });
  return Voucher;
};