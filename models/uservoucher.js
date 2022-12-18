'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserVoucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserVoucher.belongsTo(models.Voucher, { foreignKey: 'voucher_id' });
    }
  }
  UserVoucher.init({
    user_id: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1,
          msg: 'User id must be greater than 1'
        }
      }
    },
    voucher_id: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1,
          msg: 'User id must be greater than 1'
        }
      }
    },
    used: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'UserVoucher',
  });
  return UserVoucher;
};