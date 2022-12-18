const express = require('express')
const { getAllData } = require('../../controllers/categoryController')
const { refreshToken } = require('../../middleware/refreshToken');
const { verifyToken } = require('../../middleware/verifyToken');
const router = express.Router()

router.get('/', refreshToken, verifyToken, getAllData)

module.exports = router