'use strict'

import User from './user.model.js'
import { checkPassword, encrypt } from '../utils/validator.js'
import { generateJwt } from '../utils/jwt.js'
import userModel from "./user.model.js"

export const register = async(req,res)=>{
    try {
        let datos = req.body
        datos.contraseña = await encrypt(datos.password)
        datos.role = 'CLIENT'
        let user = new User(datos)
        await user.save()
        return res.send({message: `Registrado` })
    } catch (err) {
       console.error(err)
       return res.status(500).send({message:'Error al agregar Usuario'}) 
    }
}

export const login = async(req,res)=>{
    try {
        let {email,username,password}= req.body
        let user = await userModel.findOne({
            $or:[
                {username:username},
                {email:email}
            ]
        })
        if(user && await checkPassword(password,user.password)){
            let usuarioLogeado = {
                uid: user._id,
                username: user.username,
                name: user.name,
                rol: user.role
            }
            let token = await generateJwt(usuarioLogeado)
            return res.send({message: `Bienvenido ${user.name}`,
            usuarioLogeado,
            token
        })
        }
        return res.status(404).send({message: 'Contraseña o usuario incorrecto'})
    } catch (err) {
        console.error(err)
        return res.status(500).send({message: 'Fallo al iniciar sesion'})
    }
}

export const update = async(req,res)=>{
    try {
        let{role,id} = req.user
        let {uid} = req.params
        let datos = req.body
        if(role === 'ADMIN'){
            let updated = await User.findOneAndUpdate(
                {_id : uid},
                datos,
                {new: true}
                )
                if(!updated) return res.status(401).send({message: 'Usuario no se puedo actulizar'})
                return res.send({message: 'Actualizado',updated})
        }
            if(role === 'CLIENT'){
                if(id === uid){
                        let user = await User.findOne({_id: id})
                        if(await checkPassword(datos.oldpassword,user.password )){
                            datos.password = await encrypt(datos.password)
                            let updated = await User.findOneAndUpdate(
                                {_id:uid},
                                datos,
                                {new: true}
                            )
                            if(!updated) return res.status(401).send({message: 'El usuario no se pudo actualizar'})
                            return res.send({message: 'Actualizado',updated})
                    }
                   return res.status(401).send({message: 'La contraseña antigua no es la misma que la que esta en la base de datos'})
                }       
            }  
    } catch (err) {
        console.error(err)
        return res.status(500).send({message:'Error al actualizar'})
        
    }
}

export const deleteU = async(req,res)=>{
    try {
        let{role,id} = req.user
        let {uid} = req.params
        console.log(id)
        console.log(uid)
        if(role ==='ADMIN') {
            let deletedU = await User.findOneAndDelete({_id:uid})
            return  res.send({message: `Se elimino el usuario exitosamente`})}
        if(role ==='CLIENT'){
            if(uid === id){
                let deletedU = await User.findOneAndDelete({_id:uid})
                return  res.send({message: `Se elimino el usuario exitosamente`})
            }else{
                return res.status(400).send({message:'No puedes eliminar una cuenta que no es tuya'})
            }
        }
    } catch (err) {
        console.error(err)
        return res.status(500).send({message:'Error al eliminarlo '})   
    }
}


export const defaultAdmin = async()=>{
    try {
        let findUser = await userModel.findOne({username: 'Fsina'})
        if(!findUser){
            let datos = {
                name: 'Frank',
                surname: 'Sinatra',
                email: 'Fsinatra@gmail.com',
                username: 'Fsina',
                password: await encrypt('12345678'),
                phone: '55667744',
                address: 'kinal',
                role: 'ADMIN'
            }
            let user = new User(datos)
            await user.save()
            return console.log('Se agrego al ADMIN Fsina y su contraseña es 12345678')
        }
        return console.log('El ADMIN Fsina ya existe y su contraseña es 12345678')
    } catch (err) {
    }
}