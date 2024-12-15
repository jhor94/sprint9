import { validationResult } from 'express-validator'
import Localizacion from '../models/localizacionesModel.js';

export const getLocalizaciones = async(req, res) =>{
    try {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

        const localizaciones = await Localizacion.findAll()

        res.status(200).json({
            code:1,
            msg:"Localizaciones list",
            data:localizaciones
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            code:-100,
            msg:'Ha ocurrido un error al obtener las localizaciones',
            error:error
        })
    }
}

export const getLocalizacionId = async (req, res)=>{
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()})
        }
        const id = req.params.id;
        const localizacion = await Localizacion.findByPk(id)
        if(!localizacion){
            return res.status(404).json({
                code:-6,
                msg:'Localizacion no encontrada',
            })
        }
        res.status(200).json({
            code:1,
            msg:'Localizacion encontrada',
        })
    } catch (error) {
        
    }






    const {id} = req.params
    const localizacion = await Localizacion.findByPk(id)

    if(localizacion){
        res.json(localizacion)
    }else{
        res.status(404).json({message: `Localizacion con el id: ${id}no encontrada`})
    }
}

export const deleteLocalizacion = async(req, res)=>{
    const {id} = req.params
    const localizacion = await Localizacion.findByPk(id)

    if(!localizacion){
        res.status(404).json({message: `Localizacion con el id: ${id}`})
    }else{
        await localizacion.destroy()
        res.json({
            mensagge: `Localizacion con el id: ${id} ha sido eliminada`
        })
    }
}

export const postLocalizacion = async (req, res)=>{
    const {body} = req

    try{
        await Localizacion.create(body)

        res.json({message: `la localizacion fue creada con exito`})
    }catch(error){
        res.json({
            message: `Error al crear la localizacion`,
        })
    }
}

export const updateLocalizacion = async (req, res) => {
    const {body} = req
    const {id} = req.params

    try {
        const localizacion = await Localizacion.findByPk(id)

        if(localizacion){
            await localizacion.update(body)
            res.json({
                mensaje:`la localizacion con el id ${id} ha sido actualizada`
            })
        }else{
            res.status(404).json({
                message: `Localizacion no encontrada con el id ${id}`
            })
        }
        
    } catch (error) {
        res.json({
            message: `Error al actualizar la localizacion`
        })
    }
}