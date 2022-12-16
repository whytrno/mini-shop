module.exports.verifyAdmin = async (req, res, next) => {
    console.log(req.role)
    if (req.role === 'admin') {
        req.role = req.role
        next()
    } else {
        res.status(403).json({
            message: 'You dont have permission to access'
        })
    }
}