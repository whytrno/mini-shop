var express = require('express');
var router = express.Router();
const { profile } = require('../controllers/userController')
const { refreshToken } = require('../middleware/refreshToken');
const { verifyToken } = require('../middleware/verifyToken');

router.get('/profile', refreshToken, verifyToken, profile)

module.exports = router