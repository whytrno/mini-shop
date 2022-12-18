const model = require('../models')
const { beautyError } = require('./helper/main')

module.exports.create = async (req, res) => {
    const user_id = req.login_id
    const { product_id } = req.params

    try {
        const product = await model.Product.findOne({
            where: {
                id: product_id
            },
            attributes: ['user_id'],
        })

        if (product === null || product.user_id !== user_id) throw ({
            code: 401,
            data: {
                status: 'error',
                message: 'Ups, you cannot change or delete this product'
            }
        })

        req.files.forEach(async (file) => {
            await model.ProductImages.create({ path: file.filename, product_id });
        })

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

module.exports.deleteData = async (req, res) => {
    const user_id = req.login_id
    const { id } = req.params

    try {
        const productImage = await model.ProductImages.findOne({
            where: {
                id
            },
        })

        if (productImage === null) throw ({
            code: 404,
            data: {
                status: 'error',
                message: 'Data not found'
            }
        })

        const product = await model.Product.findOne({
            where: {
                id: productImage.product_id
            }
        })

        if (product === null || product.user_id !== user_id) throw ({
            code: 401,
            data: {
                status: 'error',
                message: 'Ups, you cannot change or delete this product'
            }
        })

        await productImage.destroy()

        res.status(201).json({
            status: 'success',
            message: "Successfuly delete data"
        })
    } catch (error) {
        res.status(error.code || 400).json(
            error.data || beautyError(error) || 'internal server error'
        )
    }
}

module.exports.bulkDelete = async (req, res) => {
    const user_id = req.login_id
    const { id } = req.params

    try {
        const productImage = await model.ProductImages.findOne({
            where: {
                id
            },
        })

        if (productImage === null) throw ({
            code: 404,
            data: {
                status: 'error',
                message: 'Data not found'
            }
        })

        const product = await model.Product.findOne({
            where: {
                id: productImage.product_id
            }
        })

        if (product === null || product.user_id !== user_id) throw ({
            code: 401,
            data: {
                status: 'error',
                message: 'Ups, you cannot change or delete this product'
            }
        })

        await productImage.destroy()

        res.status(201).json({
            status: 'success',
            message: "Successfuly delete data"
        })
    } catch (error) {
        res.status(error.code || 400).json(
            error.data || beautyError(error) || 'internal server error'
        )
    }
}