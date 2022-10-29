import express from 'express'
var router = express.Router()

import {verifyToken} from "../middleware/verifyToken.js";
import {getAll, find, register, update, deleteData, getRelation, login, logout} from '../controllers/userController.js'
import {refreshToken} from "../controllers/refreshToken.js";

router.get('/', refreshToken, verifyToken, getAll)
router.get('/find/:id', refreshToken, verifyToken, find)
router.get('/relation/:type', refreshToken, verifyToken, getRelation)
router.get('/refreshToken', refreshToken)
router.post('/register', register)
router.post('/login', login)
router.delete('/logout', logout)
router.put('/:id', refreshToken, verifyToken, update)
router.delete('/:id',refreshToken, verifyToken,  deleteData)

export default router