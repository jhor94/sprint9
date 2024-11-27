import { validationResult } from 'express-validator'
import Exchange from '../models/exchangeModel.js'



export const addExchange = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try {
        const existingExchange = await Exchange.findOne({ id_exchange: key});

        if(existingExchange){
            return res.status(400).json({
                code:-61,
                msg:'El intercambio ya existe en la base de datos'
            })
        }
        const {book_id, requested_book_id,from_user_id,to_user_id,status,review_rating,review_comment} = req.body
        const newExchange = await Exchange.create({
            id_exchange: key,
            book_id,
            requested_book_id,
            from_user_id,
            to_user_id,
            status,
            review_rating,
            review_comment
        })
        res.status(200).json({
            code:1,
            msg:'Intercambio agregado correctamente',
            data:newExchange
        })
    }catch (error){
    console.error(error)
    res.status(500).json({
        code:-100,
        msg: 'Ha ocurrido un error al agregar el intercambio'
    })

}
}

export const getExchange = async (req, res)=> {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).jsonn({errors:errors.array()});
        }

        const exchanges = await Exchange.findAll();

        res.status(200).json({
            code:1,
            msg:'Exchanges List',
            data: exchanges
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            code:-100,
            mgs: 'Ha ocurrido un error al obtener los intercambios',
        })
    }
}

export const getExchangeId = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {id} = req.params;
        const exchange = await Exchange.findByPk(id)
        if(!exchange){
            return res.status(404).json({
                code:-6,
                msg: 'Intercambio no encontrado'
            })
        }

        res.status(200).json({
            code:1,
            msg:'Detalle del intercambio',
            data: exchange
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            code:-100,
            msg: 'Ha ocurrido un error al obtener el intercambio'
        })
    }
};

export const updateExchange = async (req, res)=> {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const {id} = req.params
        const {status, review_rating, review_comment} = req.body
    
        const exchange = await Exchange.findByPk(id)
        if(!exchange){
            return res.status(404).json({
                code:-100,
                msg: 'Intercambio no encontrado en la base de datos'
            })
        }

        const allowStatus= ['pending','accepted','rejected','completed']
        if(status && !allowStatus.includes(status)){
            return res.status(400).json({
                code:-100,
                msg: 'Estatus no permitido'
            })
        }

        if(review_rating && (review_rating < 1 || review_rating > 5)){
            return res.status(400).json({
                code:-100,
                msg: 'Nota de reseña no permitida, la nota es entre 1 y 5'
            })
        }

        await exchange.update({
            status: status || exchange.status, // mantiene el dato actualizado y si no se actualiza este dato mantiene el que esta en sql
            review_rating: review_rating || exchange.review_rating,
            review_comment: review_comment || exchange.review_comment
        })
        res.status(200).json({
            code: 1,
            msg:'Intercambio actualizado correctamente',
            data: exchange
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code:-100,
            msg: 'Ha ocurrido un error al actualizar el intercambio'
        })
    }
}

export const deleteExchange = async (req, res) => {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const {id} = req.params

        const deletedExchange = await Exchange.destroy ({where : {id_exchange : id}})
        if(!deletedExchange){
            return res.status(404).json({
                code:-100,
                msg: 'Intercambio no encontrado en la base de datos'
            })
        }
        res.status(200).json({
            code: 1,
            msg:'Intercambio eliminado correctamente'
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code:-100,
            msg: 'Ha ocurrido un error al eliminar el intercambio'
        })
    }
}


