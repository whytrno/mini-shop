let express = require('express');
let router = express.Router();

let authRouter = require('./auth');
let adminUsersRouter = require('./admin/users');
let usersRouter = require('./users')
let productRouter = require('./products')
let productImagesRouter = require('./productImages')

router.use('/', authRouter);
router.use('/admin/users', adminUsersRouter);

router.use('/users', usersRouter)
router.use('/products', productRouter)
router.use('/product/images', productImagesRouter)

module.exports = router;
