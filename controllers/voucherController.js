const model = require('../models')
const { beautyError } = require('./helper/main')

module.exports.getAllData = async (req, res) => {
    try {
        const vouchers = await model.Voucher.findAll();

        if (vouchers.length === 0) {
            res.status(404).json({
                message: "Data not found"
            })
        } else {
            res.status(200).json(vouchers)
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports.create = async (req, res) => {
    const { code, name, description, discount } = req.body

    try {
        await model.Voucher.create({ code, name, description, discount });

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
    const { code, name, description, discount } = req.body

    try {
        const voucher = await model.Voucher.findOne({
            where: {
                id
            },
        })

        if (voucher === null) throw ({
            code: 404,
            data: {
                status: 'error',
                message: 'Data not found'
            }
        })

        await voucher.update({ code, name, description, discount })

        res.status(201).json({
            status: 'success',
            message: "Successfuly update data"
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
        const voucher = await model.Voucher.findOne({
            where: {
                id
            },
        })

        if (voucher === null) throw ({
            code: 404,
            data: {
                status: 'error',
                message: 'Data not found'
            }
        })

        await voucher.destroy()

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