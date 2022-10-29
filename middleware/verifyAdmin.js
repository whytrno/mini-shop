export const verifyAdmin = (req, res, next) => {
    if(req.role === 'ADMIN'){
        next()
    } else {
        res.status(403).json({
            status: 'error',
            message: 'You dont have permission to access'
        })
    }
}