import jwt from "jsonwebtoken";
import {errorHandler} from "../controllers/helper.js";

export const verifyToken = (req, res, next) => {
    const token = req.token
    if(token === null) return res.sendStatus(401).json({
        status: 'error',
        message: 'Token not found'
    })

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if(error) return res.status(403).json({
            status: 'error',
            message: errorHandler(error)
        });

        // melempar req.email ke route selanjutnya agar bisa dipanggil
        req.id = decoded.id
        req.email = decoded.email
        req.role = decoded.role

        // agar server dilanjutkan ke route selanjutnya
        next();
    })
}