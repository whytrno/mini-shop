const express = require('express')
const { create, deleteData } = require('../controllers/userVoucherController')
const { refreshToken } = require('../middleware/refreshToken')
const { verifyToken } = require('../middleware/verifyToken')
const router = express.Router()

router.post('/:id', refreshToken, verifyToken, create)
router.delete('/:id', refreshToken, verifyToken, deleteData)

module.exports = router