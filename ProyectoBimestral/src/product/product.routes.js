'use strict'

import Express from 'express'
import { agregarP } from './product.controller.js'

const api = Express.Router()

api.get('/agregar', agregarP)

export default api