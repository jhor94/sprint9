import { validationResult } from 'express-validator'
import Book from '../models/bookModel.js'
import loadApilibrary from '../services/apiExternal.js'

export const fetchsaveBooks = async(req,res) => {
    const {search} = req.query
    try {
        console.log("esta es la busqueda desde el controller",search)
       const books = await loadApilibrary(search);
    
        const booksData = books.map((book) => {
            return{
                external_id_api:book.key,
                title: book.title,
                author: book.author,
                cover: book.cover,
                publishers: book.publishers,
                isbn: book.isbn,
                number_of_pages: book.number_of_pages
            }
        })
       res.status(200).json({
        code: 1,
        msg: 'Books encontrados con exito',
        data: booksData
    })
    console.log(booksData)
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code:-100,
            msg:'ha ocurrido un error al guardar el libro'
        })
    }
}

export const addBook = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try {
        const existingBook = await Book.findOne({ external_id_api: key});

        if(existingBook){
            return res.status(400).json({
                code:-61,
                msg:'El libro ya existe en la base de datos'
            })
        }
        const newBook = await Book.create({
            external_id_api:Book.key,
            title: Book.title,
            author: Book.author,
            cover: Book.cover,
            publishers: Book.publishers,
            isbn: Book.isbn,
            number_of_pages: Book.number_of_pages
        })
        res.status(200).json({
            code:1,
            msg:'Libro agregado correctamente',
            data:newBook
        })
    }catch (error){
    console.error(error)
    res.status(500).json({
        code:-100,
        msg: 'Ha ocurrido un error al agregar el libro'
    })

}
}

export const getBooks = async (req, res)=> {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).jsonn({errors:errors.array()});
        }

        const books = await Book.findAll();

        res.status(200).json({
            code:1,
            msg:'Book List',
            data: books
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            code:-100,
            mgs: 'Ha ocurrido un error al obtener los libros',
        })
    }
}

export const getBookId = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {id} = req.params;
        const book = await Book.findByPk(id)
        if(!book){
            return res.status(404).json({
                code:-6,
                msg: 'Libro no encontrado'
            })
        }

        res.status(200).json({
            code:1,
            msg:'Detalle del libro',
            data: book
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            code:-100,
            msg: 'Ha ocurrido un error al obtener el libro'
        })
    }
};

export const updateBook = async (req, res)=> {

        const errors = validationResult(req)

        if(!errors){
            return res.status(400).json({ errors: errors.array() });
        }

        const {id} = req.params
        const {
            external_id_api,
            title,
            author,
            cover,
            publishers,
            isbn,
            number_of_pages} = req.body
    try {
        const book = await Book.findByPk(id)
        if(!book){
            return res.status(404).json({
                code:-100,
                msg: 'Libro no encontrado en la base de datos'
            })
        }

        await book.update({
            external_id_api: book.external_id_api,
            title:book.title,
            author:book.author,
            cover:book.cover,
            publishers:book.publishers,
            isbn:book.isbn,
            number_of_pages:book.number_of_pages
        })
        res.status(200).json({
            code: 1,
            msg:'Libro actualizado correctamente',
            data: book
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code:-100,
            msg: 'Ha ocurrido un error al actualizar el libro'
        })
    }
}

export const deleteBook = async (req, res) => {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
        }
        const {id} = req.params

        const deletedBook = await Book.destroy ({where : {book_id : id}})
        if(!deletedBook){
            return res.status(404).json({
                code:-100,
                msg: 'Libro no encontrado en la base de datos'
            })
        }
        res.status(200).json({
            code: 1,
            msg:'Libro eliminado correctamente'
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({
            code:-100,
            msg: 'Ha ocurrido un error al eliminar el libro'
        })
    }
}

