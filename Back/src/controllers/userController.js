import { validationResult } from 'express-validator'
import User from '../models/userModel.js'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config();


export const getUsers = async (req, res) => {
    try {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).jsonn({ errors: errors.array() });
        }

        const users = await User.findAll();

        res.status(200).json({
            code: 1,
            msg: 'User List',
            data: users
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            code: -100,
            mgs: 'Ha ocurrido un error al obtener los usuarios',
        })
    }
}

export const uploadPhoto = async (req, res) => {
    try {
        console.log("Archivo subido: ", req.file)
        console.log("req", req.user)
        console.log("usuario recibido con token: ", req.user.id_user)
        const rutaArchivo = "./src/uploads/"

        if (req.file === undefined) {
            console.log(req.file)
            return res.status(400).json({
                code: -100,
                msg: 'No se ha subido ninguna imagen'
            })
        }
        if (req.file != null) {
            console.log("Ruta:" + rutaArchivo + req.user.photo);
            fs.access(rutaArchivo + req.user.photo, fs.constants.F_OK, (err) => { // fs.access se utiliza para acceder al archivo y verififcar que existe o se tiene acceso
                if (err) {
                    console.log("the file does not exist or cannot be accessed")
                } else {
                    //eliminar el archivo
                    fs.unlink(rutaArchivo + req.user.photo, (err) => {// fs.unlik se utiliza para eliminar el archivo
                        if (err) {
                            console.log("Error al eliminar el archivo", err)
                            return res.status(500).json({
                                code: -103,
                                msg: 'Error al eliminar el archivo',
                                error: err
                            })
                        }
                    })
                }

            })
        } else {
            console.log("No se ha encontrado el archivo, la seteo en la DB")
        }

        console.log("Guardo la foto en: " + req.file.filename + "en el id de usuario: " + req.user.id_user);
        await User.update({photo: req.file.filename}, {where:{id_user: req.user.id_user}})
        return res.status(200).json({
            code: 1,
            msg: `La foto se ha subido correctamente ${req.file.originalname}`,
        })

    } catch (error) {

        if (error.code == "LIMIT_FILE_SIZE") {
            return res.status(500).send({
                message: "File size cannot be larger than 2MB!",
            });
        }

        res.status(500).send({
            message: `Could not upload the file: ${req.file.originalname}. ${error}`,
            error: `${error}`
        });
    }
}

