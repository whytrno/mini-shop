let express = require('express');
let router = express.Router();

let adminUsersRouter = require('./admin/users');
let adminCategoryRouter = require('./admin/category');

let authRouter = require('./auth');
let usersRouter = require('./users')
let productRouter = require('./products')
let productImagesRouter = require('./productImages')

router.use('/', authRouter);
router.use('/admin/users', adminUsersRouter);
router.use('/admin/category', adminCategoryRouter);

router.use('/users', usersRouter)
router.use('/products', productRouter)
router.use('/product/images', productImagesRouter)

module.exports = router;
