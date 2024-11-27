import { validationResult } from 'express-validator'
import Wishlist from '../models/wishlistModel.js'



export const addWishlist = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try {
        const {user_id, book_id, added_at} = req.body
        const existingWishlist = await Wishlist.findOne({ 
            where: {
                user_id: user_id,
                book_id: book_id
            }
        });

        if(existingWishlist){
            return res.status(400).json({
                code:-61,
                msg:'La wishlist ya existe en la base de datos'
            })
        }

        const newWishlist = await Wishlist.create({
            user_id,
            book_id,
            added_at,
        })
        res.status(200).json({
            code:1,
            msg:'Wishlist agregada correctamente',
            data:newWishlist
        })
    }catch (error){
    console.error(error)
    res.status(500).json({
        code:-100,
        msg: 'Ha ocurrido un error al agregar la wishlist'
    })

}
}

export const getWishlist = async (req, res)=> {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).jsonn({errors:errors.array()});
        }

        const wishlist = await Wishlist.findAll();

        res.status(200).json({
            code:1,
            msg:'Wish List Interaction',
            data: wishlist
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            code:-100,
            mgs: 'Ha ocurrido un error al obtener las wishlists',
        })
    }
}

export const getWishlistId = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {id} = req.params;
        const wishlist = await Wishlist.findByPk(id)
        if(!wishlist){
            return res.status(404).json({
                code:-6,
                msg: 'Interacción de wishlist no encontrado'
            })
        }

        res.status(200).json({
            code:1,
            msg:'Detalle de la wishlist',
            data: wishlist
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            code:-100,
            msg: 'Ha ocurrido un error al obtener la wishlist'
        })
    }
};

export const deleteBookWishlist = async (req, res)=> {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }

        const {id} = req.params
        const {book_id} = req.body
   
        const wishlist = await Wishlist.findOne({
            where:{
                user_id: id,// id del usuario que tiene la lista es el id que ponemos en la url
                book_id: book_id // libro que se desea eleminar es el id que se elimina para que se asocie en la tabla
            }
        })
        if(!wishlist){
            return res.status(404).json({
                code:-100,
                msg: 'Wishlist no encontrada en la base de datos'
            })
        }
        await wishlist.destroy()
        res.status(200).json({
            code: 1,
            msg:'Wishlist actualizado correctamente',
            data: wishlist
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code:-100,
            msg: 'Ha ocurrido un error al actualizar la wishlist'
        })
    }
}

export const deleteAllWishlist = async (req, res) => {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const {id} = req.params

        const deletedWishlist = await Wishlist.destroy ({where : {user_id : id}})
        if(!deletedWishlist){
            return res.status(404).json({
                code:-100,
                msg: 'Wishlist no encontrado en la base de datos'
            })
        }
        res.status(200).json({
            code: 1,
            msg:'Wishlist eliminado correctamente'
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code:-100,
            msg: 'Ha ocurrido un error al eliminar la wishlist'
        })
    }
}


