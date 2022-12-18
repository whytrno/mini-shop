const express = require('express')
const { getAllData } = require('../controllers/voucherController')
const router = express.Router()

router.get('/', getAllData)

module.exports = router