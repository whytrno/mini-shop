const express = require('express')
const { create, update, deleteData, archive, getAllData, find, detail } = require('../controllers/productImageController')
const { refreshToken } = require('../middleware/refreshToken')
const { verifyToken } = require('../middleware/verifyToken')
const router = express.Router()

const multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/products')
    },
    filename: function (req, file, cb) {
        console.log()
        const mimetype = '.' + file.mimetype.split('/')[1]

        cb(null, Date.now() + mimetype)
    }
})

var upload = multer({ storage: storage });

router.post('/:product_id', upload.array("image"), refreshToken, verifyToken, create)
// router.put('/:id', refreshToken, verifyToken, update)
// router.patch('/archive/:id', refreshToken, verifyToken, archive)
router.delete('/:id', refreshToken, verifyToken, deleteData)

module.exports = router 