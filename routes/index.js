let express = require('express');
let router = express.Router();

let adminUsersRouter = require('./admin/users');
let adminCategoryRouter = require('./admin/category');
let adminVoucherRouter = require('./admin/voucher');
let adminUserVoucherRouter = require('./admin/userVoucher');

let authRouter = require('./auth');
let usersRouter = require('./users')
let productRouter = require('./products')
let productImagesRouter = require('./productImages')
let voucherRouter = require('./voucher')
let userVoucherRouter = require('./userVoucher')

router.use('/', authRouter);
router.use('/admin/users', adminUsersRouter);
router.use('/admin/category', adminCategoryRouter);
router.use('/admin/voucher', adminVoucherRouter);
router.use('/admin/user-voucher', adminUserVoucherRouter);

router.use('/users', usersRouter)
router.use('/products', productRouter)
router.use('/product/images', productImagesRouter)
router.use('/voucher', voucherRouter)
router.use('/voucher', userVoucherRouter)

module.exports = router;
