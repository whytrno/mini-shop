const express = require('express')
const { getAllData } = require('../../controllers/userVoucherController')
const { refreshToken } = require('../../middleware/refreshToken')
const { verifyAdmin } = require('../../middleware/verifyAdmin');
const { verifyToken } = require('../../middleware/verifyToken')
const router = express.Router()

router.get('/', refreshToken, verifyToken, verifyAdmin, getAllData)

module.exports = router