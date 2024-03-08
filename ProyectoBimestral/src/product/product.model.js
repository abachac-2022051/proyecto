'use strict'

import {Schema,model} from "mongoose"

const productoSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type:String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    categoria: {
        type: Schema.ObjectId,
        ref: 'category',
        required: true
    },
    contador: {
        type: Number,
        default: 0
        
    },
    estado: {
        type:Boolean,
        default: true
    }
})

export default model('productos',productoSchema)