import { validationResult } from 'express-validator'
import User from '../models/userModel.js'
import bcrypt from 'bcrypt'


export const getUsers = async (req, res)=> {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).jsonn({errors:errors.array()});
        }

        const users = await User.findAll();

        res.status(200).json({
            code:1,
            msg:'User List',
            data: users
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            code:-100,
            mgs: 'Ha ocurrido un error al obtener los usuarios',
        })
    }
}

export const register = async (req, res)=> {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).jsonn({errors:errors.array()});
        }
        const {name,email,password,roles,photo} = req.body
        const existingUsers = await User.findOne({
            where: {email}
        });
        if(existingUsers){
            return res.status(400).json({
                code:-100,
                msg: 'El usuario ya existe con ese correo'
            })
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password,saltRounds)
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            roles,
            photo
        })
        res.status(200).json({
            code:1,
            msg:'User List',
            data: user
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            code:-100,
            mgs: 'Ha ocurrido un error al obtener los usuarios',
        })
    }
}

export const login = async (req, res)=>{
    try {
        const errors = validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const {email,password} = req.body
        const user = await User.findOne({
            where: {email}
        })
        if(!user){
            return res.status(400).json({
                code:-100,
                msg: 'El usuario no existe con  ese email'
            })
        }
        const isValidPassword = await bcrypt.compare(password,user.password)
        if(!isValidPassword){
            return res.status(400).json({
                code:-100,
                msg: 'La contraseña no es válida',
            })
        }
        const token = jwt.sign({id:user.id},process.env.SECRET_KEY,{
            
        })

    } catch (error) {
        
    }
}