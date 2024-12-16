import { validationResult } from 'express-validator'
import WishBook from '../models/bookwishlistModel.js'
import loadApilibrary from '../services/apiExternal.js'

export const fetchsaveBooks = async(req,res) => {
    const {search, page = 1} = req.query
    try {
        //console.log("esta es la busqueda desde el controller",search)
       const books = await loadApilibrary(search, page);
    
        const booksData = books.map((book) => {
            return{
                external_id_api:book.key,
                title: book.title,
                author: book.author,
                cover: book.cover,
                publishers: book.publishers,
                isbn: book.isbn,
                number_of_pages: book.number_of_pages,
                subject:book.subject
            }
        })
       res.status(200).json({
        code: 1,
        msg: 'WishBooks encontrados con exito',
        data: booksData
    })
    //console.log(booksData)
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code:-100,
            msg:'ha ocurrido un error al guardar el wish-libro'
        })
    }
}

export const addWishBook = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try {
        const {external_id_api, user_id,title,author,isbn,number_of_pages,cover,publishers,subject}= req.body
        const existingBook = await WishBook.findOne({ 
            where: {
                external_id_api: external_id_api,
                user_id: user_id
            }
        });

        if(existingBook){
            return res.status(400).json({
                code:-61,
                msg:'El wish-libro ya existe en la base de datos'
            })
        }
    
        const newBook = await WishBook.create({
            external_id_api,
            user_id,
            title,
            author,
            isbn,
            number_of_pages,
            cover,
            publishers,
            subject,
        })
        res.status(200).json({
            code:1,
            msg:'WishLibro agregado correctamente',
            data:newBook
        })
    }catch (error){
    console.error(error)
    res.status(500).json({
        code:-100,
        msg: 'Ha ocurrido un error al agregar el wish-libro',
        error: error
    })

}
}

export const getWishBooks = async (req, res)=> {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        console.log('Received user_id:', req.params.id);

        const wishbooks = await WishBook.findAll({
            where:{
                user_id:req.params.id
            }
        });

        res.status(200).json({
            code:1,
            msg:'WishBook List',
            data: wishbooks
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            code:-100,
            mgs: 'Ha ocurrido un error al obtener los wish-libros',
            error:error
        })
    }
}

export const deleteWishBook = async (req, res) => {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const {id} = req.params
        const user_id = req.user.id_user
        console.log(user_id, "este es el user_id")
        console.log('Received user_id:', req.params.id);

        const wishbook = await WishBook.findOne({
            where: { id_bookWish: id , user_id: user_id}
        })
        console.log(wishbook)
        const deletedBook = await wishbook.destroy()
        if(!deletedBook){
            return res.status(404).json({
                code:-100,
                msg: 'Wish-Libro no encontrado en la base de datos'
            })
        }
        res.status(200).json({
            code: 1,
            msg:'Wish-Libro eliminado correctamente'
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code:-100,
            msg: 'Ha ocurrido un error al eliminar el wish-libro'
        })
    }
}


