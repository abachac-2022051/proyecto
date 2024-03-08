'use string'

import categoriasModel from "../category/category.model.js"
import productoModel from "./product.model.js"

export const agregarP = async(req,res)=>{
    try {
        let datos = req.body
        let category = await categoriasModel.findOne({_id: datos.categoria} )
        if(!category) return res.status(400).send({message:'No se encontro la categoria'})
        let producto = new productoModel(datos)
        await producto.save()
        return res.send({message: `Se pudo agregar exitosamente el producto`})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'No se pudo agregar Nuevo Producto'})

    }
}