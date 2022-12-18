const model = require('../models')
const { beautyError } = require('./helper/main')

module.exports.getAllData = async (req, res) => {
    try {
        const userVouchers = await model.UserVoucher.findAll();

        if (userVouchers.length === 0) {
            res.status(404).json({
                message: "Data not found"
            })
        } else {
            res.status(200).json(userVouchers)
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports.create = async (req, res) => {
    const user_id = req.login_id
    const { id } = req.params

    try {
        const voucher = await model.Voucher.findOne({
            where: {
                id
            }
        })

        if (voucher === null) throw ({
            code: 404,
            data: {
                status: 'error',
                message: 'Voucher not found'
            }
        })

        const userVoucher = await model.UserVoucher.findOne({
            where: {
                user_id,
                voucher_id: id
            }
        })

        if (userVoucher !== null) throw ({
            code: 400,
            data: {
                status: 'error',
                message: 'You have already claimed this voucher'
            }
        })

        await model.UserVoucher.create({ user_id, voucher_id: id });

        res.status(201).json({
            status: 'success',
            message: "Successfuly claim data"
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
        const userVoucher = await model.UserVoucher.findOne({
            where: {
                id
            },
        })

        if (userVoucher === null) throw ({
            code: 404,
            data: {
                status: 'error',
                message: 'Data not found'
            }
        })

        await userVoucher.destroy()

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