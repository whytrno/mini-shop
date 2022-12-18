const model = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const moment = require('moment')

const { beautyError } = require('./helper/main');
const { sendMail } = require('./helper/sendMail');

module.exports.login = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await model.User.findOne({
            where: {
                email: email
            }
        })

        if (user === null) throw ({
            code: 400,
            data: {
                status: 'error',
                message: "Email or password is incorect"
            }
        })

        const checkPass = await bcrypt.compare(password, user.password);
        if (!checkPass) throw ({
            code: 400,
            data: {
                status: 'error',
                message: "Email or password is incorect"
            }
        })

        if (user.emailVerifiedAt === null) throw 'Your email has not been verified, please verify first'

        const accessToken = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '20s'
        });
        const refreshToken = jwt.sign({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });

        user.update({ refreshToken: refreshToken })

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            status: 'success',
            message: 'Successfuly login',
            token: accessToken
        })
    } catch (error) {
        res.status(error.code || 500).json(
            error.data || 'internal server error'
        )
    }
}

module.exports.register = async (req, res) => {
    const { name, email, password } = req.body

    try {
        const user = await model.User.create({ name, email, password });

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

module.exports.verifyEmail = async (req, res) => {
    const { token } = req.query

    try {
        const user = await model.User.findOne({
            where: {
                refreshToken: token
            }
        })

        if (user === null) throw ({
            code: 500,
            data: {
                status: 'error',
                message: "Email or password is incorect"
            }
        })

        if (user.emailVerifiedAt !== null) throw ({
            code: 500,
            data: {
                status: 'error',
                message: "Your email has been verified, so you dont need to verified again"
            }
        })

        const now = moment().format('YYYY-MM-DD HH:mm:ss')
        await user.update({ emailVerifiedAt: now })

        res.status(200).json({
            status: 'success',
            message: 'Email successfully verified'
        })
    } catch (error) {
        res.status(error.code || 500).json(
            error.data || 'internal server error'
        )
    }
}