'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.User, { foreignKey: 'user_id' });
      Product.hasMany(models.ProductImage, { foreignKey: 'product_id' });
      Product.hasOne(models.Category, { foreignKey: 'id' });
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter product name'
        },
        notNull: {
          msg: 'Please enter your name'
        },
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter product description'
        },
        notNull: {
          msg: 'Please enter your name'
        },
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter product price'
        },
        notNull: {
          msg: 'Please enter your name'
        },
        min: {
          args: 1,
          msg: 'Price must be greater than 1'
        }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Please enter product stock'
        },
        notNull: {
          msg: 'Please enter your name'
        },
        min: {
          args: 1,
          msg: 'Stock must be greater than 1'
        }
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1,
          msg: 'User id must be greater than 1'
        }
      }
    },
    category_id: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: 1,
          msg: 'Category id must be greater than 1'
        }
      }
    },
    archived: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Product',
  });

  return Product;
};