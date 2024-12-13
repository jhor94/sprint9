import { validationResult } from 'express-validator'
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'
import dotenv from 'dotenv'
import { serialize } from 'cookie'
import RecoveryToken from '../models/recoverytokenModel.js'
import sendEmail from '../utils/email/sendEmail.js'

dotenv.config();


const clientURL = process.env.FRONTEND_URL;
export const register = async (req, res)=> {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            console.log("Errores de validación:", errors.array()); 
            return res.status(400).json({errors:errors.array()});
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

        const saltRounds = parseInt(process.env.BCRYPT_SALT);
        const hashedPassword = await bcrypt.hash(password,saltRounds)
        const newUser = new User ({
            name,
            email,
            password: hashedPassword,
        })
        await newUser.save();
        const accessToken = jwt.sign({
            id_user: newUser.id_user,
            name:newUser.name,
        }, process.env.SECRET_KEY)
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
            accessToken:accessToken,
            data:{
                user: {
                    id_user: newUser.id_user,
                    name:newUser.name,
                    email:newUser.email
                }
            } 
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            code:-100,
            mgs: 'Ha ocurrido un error al crear el usuario',
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
            where: { email }
        });
        if(!user){
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
            id_user: user.id_user,
            name:user.name,
        }, process.env.SECRET_KEY)
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
            msg:'User logeado correctamente',
            accessToken: accessToken,
            data: {
                user:{
                    id_user:user.id_user,
                    name:user.name,
                    email:user.email,
                },
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
        if(!user){
            return res.status(400).json({
                code:-8,
                msg: 'El email NO existe'
            })
        }
        let resetToken = crypto.randomBytes(32).toString("hex");

        await new RecoveryToken({
            user_id:user.id_user,
            token:resetToken,
            created_at: Date.now()
        }).save()

        const url = `${clientURL}/change-password?token=${resetToken}&id=${user.id_user}`

        await sendEmail(
            user.email,
            'Recuperar contraseña',
            {
                name:user.name,
                url:url
            },
            "email/template/templateResetPassword.handlebars" // aqui puede ir el template de utils con la redireccion de la password
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

export const changePassword = async (req, res) =>{
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array()})
        }
        //console.log("este es el req.body",req.body)
        const {token, password} = req.body;
        console.log(token)
        let token_now = await RecoveryToken.findOne({
            where:{ token }
        })
        //console.log("TOKEN encontrado en la db: ", token_now)
        if(!token_now){
            return res.status(400).json({
                code:-3,
                msg: 'Token invalido'
            })
        }

        const user = await User.findOne({ // funcion para encontrar usuario
            where:{ id_user: token_now.user_id } // le asignamos al user el token
        })
        if(!user){ 
            return res.status(400).json({
                code:-10,
                msg: 'El usuario no existe'
            })
        }

        //actualizacion de contraseña cuando valida token y usuario
        const saltRounds = parseInt(process.env.BCRYPT_SALT);
        user.password = await bcrypt.hash(password,saltRounds); //es diferente al back de ismael
        await user.save();

        //elimino token
        await RecoveryToken.destroy({
            where: { 
                user_id: token_now.user_id
            }
        })

        //generar un token de acceso cuando se cambia la password
        const accessToken = jwt.sign({id_user:user.id_user, name: user.name} ,process.env.SECRET_KEY)
        const token_jwt = serialize('token', accessToken,{
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 * 30,
            path: '/',
          });
          res.setHeader('Set-Cookie', token_jwt);
          res.status(200).json({
            code: 1,
            msg: 'Contraseña actualizada con exito',
            data:{
                user:{
                    name:user.name,
                    email:user.email
                }
            }
          })
    } catch (error) {
        console.error(error);
        res.status(error)
        res.status(500).json({
            code: -100,
            msg: 'Error al actualizar contraseña',
            error:error
        });
    }
};

export const logout = async (req, res)=> {
    const { cookies } = req
    const jwt = cookies.token;

    const token = serialize('token',null,{
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: -1,
        path: '/',
    });
    res.setHeader('Set-Cookie', token);
    res.status(200).json({
        code: 0,
        msg: 'Sesion cerrada con exito',
    })
}



