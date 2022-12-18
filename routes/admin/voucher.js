const express = require('express')
const { getAllData, create, update, deleteData } = require('../../controllers/voucherController')
const { refreshToken } = require('../../middleware/refreshToken');
const { verifyAdmin } = require('../../middleware/verifyAdmin');
const { verifyToken } = require('../../middleware/verifyToken');
const router = express.Router()

router.get('/', refreshToken, verifyToken, verifyAdmin, getAllData)

router.post('/', refreshToken, verifyToken, verifyAdmin, create)
router.put('/:id', refreshToken, verifyToken, verifyAdmin, update)
router.delete('/:id', refreshToken, verifyToken, verifyAdmin, deleteData)

module.exports = router