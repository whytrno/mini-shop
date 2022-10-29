import { PrismaClient } from '@prisma/client'
import { validator, checkNumber, joiBeautifyError, errorHandler } from './helper.js'
import bcrypt from 'bcryptjs'
import jwt from "jsonwebtoken";

var prisma = new PrismaClient()

const dataInclude = (type) => {
    let include = {
        id: true,
        name: true,
        email: true,
    }

    if(!type){
        return include
    } else if(type === 'product'){
        include.Products = true
        return include
    } else if(type === 'cart'){
        include.Carts = true
        return include
    }
}

// GET
export const getAll = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: dataInclude()
        })

        if (users.length !== 0) {
            res.status(200).json({
                status: 'success',
                data: users
            })
        } else {
            res.status(404).json(helper.respond({
                status: 'error',
                message: 'Data not found'
            }))
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: errorHandler(error)
        })
    }
}
export const find = async (req, res) => {
    try{
        const id = checkNumber(req.params.id)

        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: id
            },
            select: dataInclude()
        })

        res.status(200).json({
            status: 'success',
            data: user
        })
    }catch(error){
        res.status(400).json({
            status: 'error',
            error: errorHandler(error)
        })
    }
}
export const getRelation = async (req, res) => {
    try{
        const types = [
            'product', 'cart'
        ]

        const id = req.id

        const type = req.params.type
        if(!types.includes(type)) throw 'Please enter valid parameter'

        const user = await prisma.user.findUniqueOrThrow({
            where: {
                // TODO: id masih static, harusnya diganti id user yang sedang login
                id: id
            },
            select: dataInclude(type),
        })

        res.status(200).json({
            status: 'success',
            data: user
        })
    } catch(error) {
        res.status(400).json({
            status: 'error',
            message: errorHandler(error)
        })
    }
}

// POST, UPDATE, DELETE
export const register = async (req, res) => {
    const { error, value } = validator('user', req.body)

    if (!error) {
        // menghapus value.confirmPassword agar dapat dimasukan ke db
        // TODO: seharusnya ini ada di helper
        delete value.confirmPassword
        const salt = bcrypt.genSaltSync(10);
        value.password = bcrypt.hashSync(value.password, salt);

        try{
            await prisma.user.create({
                data: value
            })
            res.status(201).json({
                status: "success",
                message: "Data successfully stored"
            })
        }catch(error){
            res.status(400).json({
                status: 'error',
                message: errorHandler(error)
            })
        }
    } else {
        res.status(400).json({
            status: "error",
            message: joiBeautifyError(error)
        })
    }
}
export const login = async (req, res) => {
    try {
        if(!req.body.email) throw "Please enter your email"

        const user = await prisma.user.findUniqueOrThrow({
            where: {
                email: req.body.email
            },
        })
        const checkPass = await bcrypt.compare(req.body.password, user.password);
        if (!checkPass) throw 'Your email or password is wrong, please re enter your credentials'

        const accessToken = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.ACCESS_TOKEN_SECRET, {
            // TODO: ONLY ON DEVELOPMENT EXPIRESIN IS 2h, WHEN PRODUCTION MUST BE 20s FOR SECURITY
            expiresIn: '20s'
            // expiresIn: '2h'
        });
        const refreshToken = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        });

        await prisma.user.update({
            where: {
                email: req.body.email
            },
            data: {
                refreshToken: refreshToken,
            },
        })

        user.token = accessToken

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.status(200).json({
            status: 'success',
            token: accessToken
        })
    } catch(error) {
        if(error.name === 'NotFoundError') error = 'Your email or password is wrong, please re enter your credentials'
        res.status(400).json({
            status: 'error',
            message: errorHandler(error)
        })
    }
}
export const logout = async (req, res) => {
    try{
        const refreshToken = req.cookies.refreshToken
        if(!refreshToken) throw 'Token not found, you are not logged in'

        const user = await prisma.user.findUniqueOrThrow({
            where: {
                refreshToken: refreshToken
            }
        })

        await prisma.user.update({
            where: {
                id: user.id
            },
            data: {
                refreshToken: null
            }
        })
        res.clearCookie('refreshToken')

        res.status(200).json({
            status: 'success',
            message: 'Successfully logout'
        })
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: errorHandler(error)
        })
    }
}
export const update = async (req, res) => {
    const { error, value } = validator('user', req.body)

    if (!error) {
        delete value.confirmPassword
        const salt = bcrypt.genSaltSync(10);
        value.password = bcrypt.hashSync(value.password, salt);

        try{
            const id = checkNumber(req.params.id)

            await prisma.user.update({
                where: {
                    id: id
                },
                data: value
            })
            res.status(201).json({
                status: "success",
                message: "Data successfully updated"
            })
        }catch(error){
            res.status(400).json({
                status: 'error',
                message: errorHandler(error)
            })
        }
    } else {
        res.status(400).json({
            status: "error",
            message: joiBeautifyError(error)
        })
    }
}
export const deleteData = async (req, res) => {
    try {
        const id = checkNumber(req.params.id)

        await prisma.user.delete({
            where: {
                id: id
            }
        })

        res.status(201).json({
            status: "success",
            message: "Data successfully deleted"
        })
    }catch(error) {
        res.status(400).json({
            status: "error",
            message: errorHandler(error)
        })
    }
}