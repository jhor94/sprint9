import { validationResult } from 'express-validator'
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import dotenv from 'dotenv'
import { serialize } from 'v8'
import RecoveryToken from '../models/recoverytokenModel.js'

dotenv.config();


const clientURL = process.env.FRONTEND_URL;
export const register = async (req, res)=> {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).jsonn({errors:errors.array()});
        }
        const {name,email,password} = req.body
        const existingUsers = await User.findOne({
            where: {email}
        });
        if(existingUsers){
            return res.status(400).json({
                code:-100,
                msg: 'El usuario ya existe con ese correo'
            })
        }

        const saltRounds = process.env.BCRYPT_SALT;
        const hashedPassword = await bcrypt.hash(password,saltRounds)
        const newUser = await User ({
            name,
            email,
            password: hashedPassword,
        })
        await newUser.save();
        const accessToken = jwt.sign({
            id_user: newUser.id_user,
            name:newUser.name,
        }.process.env.SECRET_KEY)
        const token = serialize('token', accessToken,{
            httpOnly:true, //solo accesible desde el servidor no desde javascript del cliente
            secure: process.env.NODE_ENV === 'production', //Solo se envía a través de conexiones HTTPS (en producción).
            sameSite: 'strict', //evita que se envio de la cookies desde otros dominios
            maxAge: 60 * 60 * 24 * 30, //tiempo de vida de la cookie 30dias
            path: '/' // Establece el ámbito de la cookie en todo el dominio (/).
        })
        res.setHeader('set-Cookie', token)
        res.status(200).json({
            code:1,
            msg:'User Registrado correctamente',
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            code:-100,
            mgs: 'Ha ocurrido un error al obtener los usuarios',
        })
    }
}

export const login = async (req, res)=> {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).jsonn({errors:errors.array()});
        }
        const {email,password} = req.body
        const user = await User.findOne({
            where: {email}
        });
        if(user){
            return res.status(400).json({
                code:-25,
                msg: 'El usuario NO existe'
            })
        }
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword){
            return res.status(400).json({
                code:-25,
                msg: 'La contraseña NO es válida'
            })
        }
        //creacion de token de acceso
        const accessToken = jwt.sign({
            id_user: newUser.id_user,
            name:newUser.name,
        }.process.env.SECRET_KEY)
        const token = serialize('token', accessToken,{
            httpOnly:true, //solo accesible desde el servidor no desde javascript del cliente
            secure: process.env.NODE_ENV === 'production', //Solo se envía a través de conexiones HTTPS (en producción).
            sameSite: 'strict', //evita que se envio de la cookies desde otros dominios
            maxAge: 60 * 60 * 24 * 30, //tiempo de vida de la cookie 30dias
            path: '/' // Establece el ámbito de la cookie en todo el dominio (/).
        })
        res.setHeader('set-Cookie', token)
        res.status(200).json({
            code:1,
            msg:'User Registrado correctamente',
            data: {
                user:{
                    name:user.name,
                    email:user.email,
                }
            }
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            code:-100,
            mgs: 'Ha ocurrido un error al obtener los usuarios',
        })
    }
}

export const forgotPassword = async (req, res)=> {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).jsonn({errors:errors.array()});
        }
        const {email} = req.body
        const user = await User.findOne({
            where: {email}
        });
        if(user){
            return res.status(400).json({
                code:-8,
                msg: 'El email NO existe'
            })
        }
        let resetToken = crypto.randomBytes(32).toString("hex");

        await new RecoveryToken({
            user_id:user.id_user,
            token:resetToken,
            createdAt:new Date.now()
        }).save()

        const url = `${clientURL}/reset-password/${resetToken}&id=${user.id_user}`

        await sendEmail(
            user.email,
            'Recuperar contraseña',
            {
                name:user.name,
                url:url
            },
            'reset-password' // aqui puede ir el template de utils con la redireccion de la password
        ).then(response=>{
            console.log("Resultado del envio del correo: ", response)
            res.status(200).json({
                code:100,
                msg: 'Se ha enviado un correo para recuperar la contraseña',
                data: {
                    token:resetToken,
                    url:url
                }
            })
        },error =>{
            console.log("Error al enviar el correo: ", error)
            res.status(200).json({
                code:-80,
                msg:'Error al enviar el correo de recuperacion de contraseña',
                data: {error}
            })
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            code:-100,
            mgs: 'Ha ocurrido un error al obtener los usuarios',
        })
    }
}



