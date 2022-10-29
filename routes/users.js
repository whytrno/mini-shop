import express from 'express'
var router = express.Router()

import {getAll, find, store, update, deleteData} from '../controllers/userController.js'

router.get('/', getAll)
router.get('/find/:id', find)
router.post('/', store)
router.put('/:id', update)
router.delete('/:id', deleteData)

export default router