'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Category extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
    }
    Category.init({
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: 'Category already exists'
            },
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