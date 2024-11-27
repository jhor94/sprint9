import { validationResult } from 'express-validator'
import Message from '../models/messageModel.js'



export const addMessage = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try {
        const existingMessage = await Message.findOne({ id_message: key});

        if(existingMessage){
            return res.status(400).json({
                code:-61,
                msg:'El mensaje ya existe en la base de datos'
            })
        }
        const {book_id, from_user_id, to_user_id, message} = req.body
        const newMessage = await Message.create({
            book_id,
            from_user_id,
            to_user_id,
            message,
        })
        res.status(200).json({
            code:1,
            msg:'Mensaje agregado correctamente',
            data:newMessage
        })
    }catch (error){
    console.error(error)
    res.status(500).json({
        code:-100,
        msg: 'Ha ocurrido un error al agregar el mensaje'
    })

}
}

export const getMessage = async (req, res)=> {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).jsonn({errors:errors.array()});
        }

        const message = await Message.findAll();

        res.status(200).json({
            code:1,
            msg:'Message List Interaction',
            data: message
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            code:-100,
            mgs: 'Ha ocurrido un error al obtener los mensajes',
        })
    }
}

export const getMessageId = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {id} = req.params;
        const message = await Message.findByPk(id)
        if(!message){
            return res.status(404).json({
                code:-6,
                msg: 'Interacción de mensaje no encontrado'
            })
        }

        res.status(200).json({
            code:1,
            msg:'Detalle de la interacción',
            data: message
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            code:-100,
            msg: 'Ha ocurrido un error al obtener los mensajes'
        })
    }
};

export const updateMessage = async (req, res)=> {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const {id} = req.params
        const {message} = req.body
   
        const messages = await Message.findByPk(id)
        if(!messages){
            return res.status(404).json({
                code:-100,
                msg: 'Intercambio no encontrado en la base de datos'
            })
        }
        await messages.update({
            message
        })
        res.status(200).json({
            code: 1,
            msg:'Intercambio actualizado correctamente',
            data: messages
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code:-100,
            msg: 'Ha ocurrido un error al actualizar el intercambio'
        })
    }
}

export const deleteMessage = async (req, res) => {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const {id} = req.params

        const deletedMessage = await Message.destroy ({where : {id_message : id}})
        if(!deletedMessage){
            return res.status(404).json({
                code:-100,
                msg: 'Interacción de mensajes no encontrado en la base de datos'
            })
        }
        res.status(200).json({
            code: 1,
            msg:'Interacción de mensajes eliminado correctamente'
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code:-100,
            msg: 'Ha ocurrido un error al eliminar la interacción de mensajes'
        })
    }
}


