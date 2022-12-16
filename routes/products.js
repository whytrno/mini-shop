const express = require('express')
const { create, update, deleteData, archive, getAllData, find, detail } = require('../controllers/productController')
const { refreshToken } = require('../middleware/refreshToken')
const { verifyToken } = require('../middleware/verifyToken')
const router = express.Router()

router.get('/', getAllData)
router.get('/detail/:id', detail)
router.get('/find', find)

router.post('/', refreshToken, verifyToken, create)
router.put('/:id', refreshToken, verifyToken, update)
router.patch('/archive/:id', refreshToken, verifyToken, archive)
router.delete('/:id', refreshToken, verifyToken, deleteData)

module.exports = router