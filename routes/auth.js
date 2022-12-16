var express = require('express');
var router = express.Router();

const { login, register, verifyEmail } = require('../controllers/authController');

router.post('/login', login)
router.post('/register', register)
router.get('/auth/verify-email', verifyEmail)

module.exports = router