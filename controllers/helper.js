import { Prisma } from '@prisma/client'
import Joi from 'joi'
import log from 'log-to-file'

const userSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(7).required(),
    confirmPassword: Joi.ref("password")
})
export const validator = (type, payload) => {
    if(type === 'user') {
        const checked =  userSchema.validate(payload, { abortEarly: false })

        return checked
    }
}

export function checkNumber(id) {
    const checkNumber = !isNaN(id)

    if (!checkNumber) {
        throw 'Please enter valid number'
    } else {
        const id_ = parseInt(id)
        return id_
    }
}

export const joiBeautifyError = (error) => {
    let errorMessage = [];
    for (const index in error.details) {
        errorMessage.push({
            path: error.details[index].path[0],
            message: error.details[index].message
        })
    }
    return errorMessage
}

export const errorHandler = (error) => {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2001') {
            return 'Data not found'
        } else if (error.code === 'P2002') {
            return 'Email has been used, please use another email'
        } else if (error.meta.cause) {
            return error.meta.cause
        } else {
            // Jika error tidak bisa di handle atau tidak di ketahui, maka akan di log pada error.log
            log(error.code, 'error.log');
            return {
                errorCode: error.code,
            }
        }
    }else{
        return error
    }
}