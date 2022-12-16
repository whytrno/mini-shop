var express = require('express');
var router = express.Router();
const { getAllData, find, detail, create, update, deleteData } = require('../../controllers/admin/userController');
const { refreshToken } = require('../../middleware/refreshToken');
const { verifyAdmin } = require('../../middleware/verifyAdmin');
const { verifyToken } = require('../../middleware/verifyToken');

router.get('/', refreshToken, verifyToken, verifyAdmin, getAllData);
router.post('/', refreshToken, verifyToken, verifyAdmin, create)
router.get('/detail/:id', refreshToken, verifyToken, verifyAdmin, detail)
router.get('/find', refreshToken, verifyToken, verifyAdmin, find)
router.put('/:id', refreshToken, verifyToken, verifyAdmin, update)
router.delete('/:id', refreshToken, verifyToken, verifyAdmin, deleteData)

module.exports = router;
