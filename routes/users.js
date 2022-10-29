import express from 'express'
var router = express.Router()

import {verifyToken} from "../middleware/verifyToken.js";
import {
    getAll,
    find,
    register,
    update,
    deleteData,
    getRelation,
    login,
    logout,
    verifyEmail, sendVerifyEmail, changeProfile, profile
} from '../controllers/userController.js'
import {refreshToken} from "../controllers/refreshToken.js";
import {verifyAdmin} from "../middleware/verifyAdmin.js";

// AUTH
router.get('/refreshToken', refreshToken)
router.post('/register', register)
router.post('/login', login)
router.delete('/logout', logout)

// USER
router.get('/profile', refreshToken, verifyToken, profile)
router.put('/profile', refreshToken, verifyToken, changeProfile)

// ADMIN
router.get('/', refreshToken, verifyToken, verifyAdmin, getAll)
router.get('/find/:id', refreshToken, verifyToken, verifyAdmin, find)
router.get('/relation/:type', refreshToken, verifyToken, verifyAdmin, getRelation)
router.put('/:id', refreshToken, verifyToken, verifyAdmin, update)
router.delete('/:id',refreshToken, verifyToken,  verifyAdmin, deleteData)

// VERIFY EMAIL
router.post('/verify', sendVerifyEmail)
router.get('/verify', verifyEmail)

export default router