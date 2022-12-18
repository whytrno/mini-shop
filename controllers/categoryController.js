const model = require('../models')
const { beautyError } = require('./helper/main')

module.exports.getAllData = async (req, res) => {
    try {
        const categories = await model.Category.findAll();

        if (categories.length === 0) {
            res.status(404).json({
                message: "Data not found"
            })
        } else {
            res.status(200).json(categories)
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports.create = async (req, res) => {
    const { name } = req.body

    try {
        await model.Category.create({ name });

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
    const { id } = req.params
    const { name } = req.body

    try {
        const category = await model.Category.findOne({
            where: {
                id
            },
        })

        if (category === null) throw ({
            code: 404,
            data: {
                status: 'error',
                message: 'Data not found'
            }
        })

        await category.update({ name })

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

module.exports.deleteData = async (req, res) => {
    const { id } = req.params

    try {
        const category = await model.Category.findOne({
            where: {
                id
            },
        })

        if (category === null) throw ({
            code: 404,
            data: {
                status: 'error',
                message: 'Data not found'
            }
        })

        await category.destroy()

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