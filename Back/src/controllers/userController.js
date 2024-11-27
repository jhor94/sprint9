import { validationResult } from 'express-validator'
import User from '../models/userModel.js'
import dotenv from 'dotenv'

dotenv.config();


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

