import { PrismaClient } from '@prisma/client'
import { validator, checkNumber, joiBeautifyError, errorHandler } from './helper.js'

var prisma = new PrismaClient()

const include = {
    id: true,
    name: true,
    email: true
}

// GET
export const getAll = async (req, res) => {
    try {
        const users = await prisma.user.findMany({
            select: include
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
            select: include
        })

        res.status(200).json({
            status: 'success',
            data: user
        })
    }catch(error){
        if(error.name === 'NotFoundError') error = 'Data not found'
        res.status(400).json({
            status: 'error',
            error: errorHandler(error)
        })
    }
}

// POST, UPDATE, DELETE
export const store = async (req, res) => {
    const { error, value } = validator('user', req.body)

    if (!error) {
        // menghapus value.confirmPassword agar dapat dimasukan ke db
        // TODO: seharusnya ini ada di helper
        delete value.confirmPassword

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
export const update = async (req, res) => {
    const { error, value } = validator('user', req.body)

    if (!error) {
        delete value.confirmPassword

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