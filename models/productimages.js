'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductImages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductImages.belongsTo(models.Product, { foreignKey: 'product_id' });
    }
  }
  ProductImages.init({
    path: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter product image path'
        },
        notNull: {
          msg: 'Please enter product image path'
        },
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1,
          msg: 'Product id must be greater than 1'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'ProductImages',
  });
  return ProductImages;
};