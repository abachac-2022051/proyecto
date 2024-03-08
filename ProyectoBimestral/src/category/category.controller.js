'use strict'


import categoriaModelo from './category.model.js'
 
export const agregarCategoria = async(req,res)=>{
    try {
        let datos = req.body
        let categoria = new categoriaModelo(datos)
        await categoria.save()
        return res.send({message: 'Se agrego exitosamente ',categoria})
        
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'No se pudo agregar Categoria'})
    }
}
export const listarCategoria = async(req,res)=>{
    try {
        let categoria  = await categoriaModelo.find()
        if(categoria.length === 0) return res.status(400).send({message: 'No funciono'})
        return res.send({categoria})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'No hay categorias existentes'})
    }
}

export const actulizarCategoria = async(req,res)=>{
    try {
        let {id} = req.params
        let datos = req.body
        let actulizarCategoria = await categoriaModelo.findOneAndUpdate(
            {_id: id},
            datos,
            {new: true}

        )
        if(!actulizarCategoria)return res.status(401).send({message: 'No se pudieron actulizar los datos'})
        return res.send({message:'Actualizado',actulizarCategoria})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message:'Error al actulizar'})
    }
}

/* export const eliminarCategoria = async (req, res) => {
    try {
        let { id } = req.params
        const defecto = await categoriaModelo.findOne({categoria: 'Por_Defecto'})
        await empresaModelo.updateMany({categoria: id}, {categoria: defecto._id})

        let eliminarCategoria = await categoriaModelo.deleteOne({_id: id})
        if(!eliminarCategoria) return res.status(404).send({message: 'No se encontro la categoria'})
        return res.send({message: 'la categoria fue eliminada'})
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'Error al eliminar' })
    }
} */

 
export const agregarPorDefecto = async()=>{
    try {
        let buscarCategoria = await categoriaModelo.findOne({ name: 'Por_Defecto' })
        if (!buscarCategoria) {
            let datos = {
                name: 'Por_Defecto',
                description: 'Por defecto no tiene categoria'
            }
            let categoria = new categoriaModelo(datos)
            await categoria.save()
            return console.log('Se acaba de agregar categoria Por Defecto')
        } 
         
    } catch (err) {  
    }
}