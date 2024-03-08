'use strict'

import  Express  from "express"
import { actulizarCategoria, agregarCategoria, listarCategoria } from "./category.controller.js"
import { validateJwt } from "../middlewares/validate-jwt.js"


const api = Express.Router()



api.get('/listarCategoria', [validateJwt], listarCategoria)
api.post('/agregarCategorias',[validateJwt],agregarCategoria)
api.put('/actualizarCategoria/:id',[validateJwt], actulizarCategoria)
/* api.delete('/eliminarCategoria/:id',[validateJwt], eliminarCategoria) */

export default api