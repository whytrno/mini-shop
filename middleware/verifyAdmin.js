module.exports.verifyAdmin = async (req, res, next) => {
    const role = req.login_role
    console.log(req)
    if (role === 'admin') {
        req.role = role
        next()
    } else {
        res.status(403).json({
            message: 'You dont have permission to access'
        })
    }
}