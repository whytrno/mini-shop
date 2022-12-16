const jwt = require("jsonwebtoken")
const model = require('../models')

module.exports.refreshToken = (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
        res.status(401).json({
            status: 'error',
            message: 'You are not logged in, please login first'
        })
    } else {
        jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (error, decoded) => {
            if (error) {
                if (error.name === 'TokenExpiredError') {
                    res.status(403).json({
                        message: 'Your session has been expired, please login again'
                    })
                } else {
                    res.status(403).json(error.message)
                }
            }

            const id = decoded.id;
            const name = decoded.name;
            const email = decoded.email;
            const role = decoded.role;

            // melempar req.email ke route selanjutnya agar bisa dipanggil
            req.token = jwt.sign({ id, name, email, role }, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: '20s'
            })

            next()
        });
    }
}