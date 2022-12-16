const model = require('../../models')
const jwt = require('jsonwebtoken')
const { Op } = require('sequelize');

const { beautyError } = require('../helper/main');
const { sendMail } = require('../helper/sendMail');

const attributes = ['id', 'name', 'email', 'emailVerifiedAt', 'role']

module.exports.getAllData = async (req, res) => {
    try {
        const users = await model.User.findAll({
            attributes
        });

        if (users.length === 0) {
            res.status(404).json({
                message: "Data not found"
            })
        } else {
            res.status(200).json(users)
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
        const user = await model.User.findOne({
            where: {
                id
            },
            attributes: attributes,
            include: model.Product
        })

        if (user === null) {
            res.status(404).json({
                message: "Data not found"
            })
        } else {
            res.status(200).json(user)
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
        const users = await model.User.findAll({
            where: {
                [Op.or]: [
                    {
                        name: {
                            [Op.like]: `%${key}%`
                        }
                    },
                    {
                        email: {
                            [Op.like]: `%${key}%`
                        }
                    }
                ]
            },
            attributes: attributes,
            include: model.Product
        })

        if (users.length === 0) {
            res.status(404).json({
                message: "Data not found"
            })
        } else {
            res.status(200).json(users)
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
module.exports.create = async (req, res) => {
    const { name, email, password, role } = req.body

    try {
        const user = await model.User.create({
            name: name,
            email: email,
            password: password,
            role: role
        });

        const refreshToken = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });

        await user.update({ refreshToken: refreshToken })

        await sendMail({
            type: 'verification',
            user: user
        })

        res.status(201).json({
            status: 'success',
            message: "Successfuly insert data"
        })
    } catch (error) {
        res.status(400).json(beautyError(error))
    }
}
module.exports.update = async (req, res) => {
    const { name, email, password, role } = req.body
    const { id } = req.params

    try {
        const user = await model.User.findByPk(id)

        if (user === null) {
            res.status(404).json({
                message: "Data not found"
            })
        } else {
            await user.update({ name, email, password, role })

            res.status(200).json({
                status: 'success',
                message: "Successfully update data"
            })
        }
    } catch (error) {
        res.status(401).json(beautyError(error))
    }
}
module.exports.deleteData = async (req, res) => {
    const { id } = req.params

    try {
        const user = await model.User.findByPk(id)

        if (user === null) {
            res.status(404).json({
                message: "Data not found"
            })
        } else {
            await user.destroy()

            res.status(200).json({
                status: 'success',
                message: "Successfuly delete data"
            })
        }
    } catch (error) {
        res.status(400).json({
            message: error
        })
    }
}