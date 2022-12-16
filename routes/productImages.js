const express = require('express')
const { create, update, deleteData, archive, getAllData, find, detail } = require('../controllers/productImageController')
const { refreshToken } = require('../middleware/refreshToken')
const { verifyToken } = require('../middleware/verifyToken')
const router = express.Router()

router.post('/:product_id', refreshToken, verifyToken, create)
// router.put('/:id', refreshToken, verifyToken, update)
// router.patch('/archive/:id', refreshToken, verifyToken, archive)
router.delete('/:id', refreshToken, verifyToken, deleteData)

module.exports = router 