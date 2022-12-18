const { Op } = require('sequelize')
const model = require('../models')
const { beautyError } = require('./helper/main')

const userAttributes = ['id', 'name']
const productAttributesWithout = ['archived', 'createdAt', 'updatedAt']
const productImageAttributes = ['id', 'path']

module.exports.getAllData = async (req, res) => {
    try {
        const products = await model.Product.findAll({
            where: {
                archived: false
            },
            attributes: { exclude: productAttributesWithout },
            include: [
                {
                    model: model.ProductImage,
                    attributes: productImageAttributes
                },
                {
                    model: model.User,
                    attributes: userAttributes
                },
                {
                    model: model.Category,
                    attributes: ['id', 'name']
                }
            ],
        });

        if (products.length === 0) {
            res.status(404).json({
                message: "Data not found"
            })
        } else {
            res.status(200).json(products)
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
module.exports.detail = async (req, res) => {
    const { id } = req.params

    try {
        const product = await model.Product.findOne({
            where: {
                id,
                archived: false
            },
            attributes: { exclude: productAttributesWithout },
            include: [
                {
                    model: model.User,
                    attributes: userAttributes
                },
                {
                    model: model.ProductImage,
                    attributes: productImageAttributes
                }
            ]
        })

        if (product === null) {
            res.status(404).json({
                message: "Data not found"
            })
        } else {
            res.status(200).json(product)
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
module.exports.find = async (req, res) => {
    const { key } = req.query

    try {
        if (key === undefined || key === null) throw ({
            code: 400,
            data: {
                status: 'error',
                message: 'Please enter key'
            }
        })

        const products = await model.Product.findAll({
            where: {
                name: {
                    [Op.like]: `%${key}%`
                },
                archived: false
            },
            attributes: { exclude: productAttributesWithout },
            include: [
                {
                    model: model.User,
                    attributes: userAttributes
                },
                {
                    model: model.ProductImage,
                    attributes: productImageAttributes
                }
            ]
        })

        if (products.length === 0) {
            res.status(404).json({
                message: "Data not found"
            })
        } else {
            res.status(200).json(products)
        }
    } catch (error) {
        res.status(error.code || 500).json(
            error.data ||
            {
                status: 'error',
                message: error.message
            } ||
            'internal server error'
        )
    }
}

module.exports.create = async (req, res) => {
    const { name, description, price, stock, category_id } = req.body
    const user_id = req.login_id

    try {
        const product = await model.Product.findOne({
            where: {
                name: name
            }
        })

        const category = await model.Category.findOne({
            where: {
                id: category_id
            }
        })

        if (category === null) throw ({
            code: 404,
            data: {
                status: 'error',
                message: 'Category not found'
            }
        })

        if (product !== null) throw ({
            code: 400,
            data: {
                status: 'error',
                message: 'You have already created this product'
            }
        })

        await model.Product.create({ name, description, price, stock, user_id, category_id });

        res.status(201).json({
            status: 'success',
            message: "Successfuly insert data"
        })
    } catch (error) {
        res.status(error.code || 400).json(
            error.data || beautyError(error) || 'internal server error'
        )
    }
}

module.exports.update = async (req, res) => {
    const { name, description, price, stock, category_id } = req.body
    const user_id = req.login_id
    const { id } = req.params

    try {
        const product = await model.Product.findOne({
            where: {
                id
            }
        })

        if (product === null) throw ({
            code: 404,
            data: {
                status: 'error',
                message: 'Data not found'
            }
        })

        if (product.user_id !== user_id) throw ({
            code: 401,
            data: {
                status: 'error',
                message: 'Ups, you cannot change or delete this product'
            }
        })

        await product.update({ name, description, price, stock, category_id })

        res.status(200).json({
            status: 'success',
            message: "Successfully update data"
        })
    } catch (error) {
        res.status(error.code || 500).json(
            error.data || beautyError(error) || 'internal server error'
        )
    }
}

module.exports.archive = async (req, res) => {
    const user_id = req.login_id
    const { id } = req.params

    try {
        const product = await model.Product.findOne({
            where: {
                id
            }
        })

        if (product === null) throw ({
            code: 404,
            data: {
                status: 'error',
                message: 'Data not found'
            }
        })

        if (product.user_id !== user_id) throw ({
            code: 401,
            data: {
                status: 'error',
                message: 'Ups, you cannot change or delete this product'
            }
        })

        let archived = product.archived
        archived === 0 ? archived = 1 : archived = 0

        await product.update({ archived })

        res.status(200).json({
            status: 'success',
            message: "Successfully archive/unarchive data"
        })
    } catch (error) {
        res.status(error.code || 400).json(
            error.data || beautyError(error) || 'internal server error'
        )
    }
}

module.exports.deleteData = async (req, res) => {
    const user_id = req.login_id
    const { id } = req.params

    try {
        const product = await model.Product.findOne({
            where: {
                id
            }
        })

        if (product === null) throw ({
            code: 404,
            data: {
                status: 'error',
                message: 'Data not found'
            }
        })

        if (product === null || product.user_id !== user_id) throw ({
            code: 401,
            data: {
                status: 'error',
                message: 'Ups, you cannot change or delete this product'
            }
        })

        await product.destroy()

        res.status(200).json({
            status: 'success',
            message: "Successfully delete data"
        })
    } catch (error) {
        res.status(error.code || 400).json(
            error.data ||
            {
                status: 'error',
                message: error.message
            } ||
            'internal server error'
        )
    }
}
