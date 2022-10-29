import jwt from "jsonwebtoken";
import { PrismaClient } from '@prisma/client'
import {errorHandler} from "./helper.js";

const prisma = new PrismaClient()

export const refreshToken = async(req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if(!refreshToken) {
            res.status(401).json({
                status: 'error',
                message: errorHandler('Token not found, please login first')
            })
        }

        const user = await prisma.user.findUniqueOrThrow({
            where:{
                refreshToken: refreshToken
            }
        });

        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
            if(err) return res.sendStatus(403);
            const id = user.id;
            const name = user.name;
            const email = user.email;
            const role = user.role;
            const accessToken = jwt.sign({id, name, email, role}, process.env.ACCESS_TOKEN_SECRET,{
                expiresIn: '15s'
            });
            req.token = accessToken

            next()
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: errorHandler(error)
        })
    }
}