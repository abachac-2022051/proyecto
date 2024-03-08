'use strict'

import express from 'express'
import { deleteU, login, register, update, defaultAdmin } from './user.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

const api = express.Router()

api.post('/register', register)
api.post('/login', login)
api.put('/update/:uid', [validateJwt], update)
api.delete('/delete/:uid',[validateJwt], deleteU)

export default api