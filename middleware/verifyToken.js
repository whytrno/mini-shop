const jwt = require("jsonwebtoken")

module.exports.verifyToken = (req, res, next) => {
    const token = req.token

    if (token === null || token === undefined) return res.sendStatus(401).json({
        message: 'You are not logged in, please login first'
    })

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
        if (error) return res.status(403).json({
            message: error
        });

        // melempar req ke route selanjutnya agar bisa dipanggil
        req.login_id = decoded.id
        req.login_name = decoded.id
        req.login_email = decoded.email
        req.login_role = decoded.role

        // agar server dilanjutkan ke route selanjutnya
        next();
    })
}