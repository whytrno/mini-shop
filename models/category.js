'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        // static associate(models) {
        //     Category.belongsTo(models.Product, { foreignKey: 'product_id' });
        // }
    }
    Category.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: 'Please enter category name'
                },
                notNull: {
                    msg: 'Please enter category name'
                },
            }
        },
    }, {
        sequelize,
        modelName: 'Category',
    });
    return Category;
};