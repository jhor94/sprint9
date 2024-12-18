import { validationResult } from 'express-validator'
import Book from '../models/bookModel.js'
import BooksUsers from '../models/booksUsersModel.js'
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
        msg: 'Books encontrados con exito',
        data: booksData
    })
    //console.log(booksData)
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
        const {external_id_api, user_id,title,author,isbn,number_of_pages,cover,publishers,subject, action}= req.body
        const existingBook = await Book.findOne({ 
            where: {
                external_id_api: external_id_api
            }
        });

        let id_book = NaN

        if(!existingBook){
            const newBook = await Book.create({
                external_id_api,
                title,
                author,
                isbn,
                number_of_pages,
                cover,
                publishers,
                subject,
            })

            id_book = newBook.id_book
            return res.status(200).json({
                code: 6,
                msg: 'Libro agregado al usuario correctamente',
                data: { book: newBook, bookUser: { user_id, book_id: id_book, action } }
            });

        }else{
            id_book = existingBook.id_book

            const existingBookUser = await BooksUsers.findOne({
                where: {
                    user_id,
                    book_id: id_book,
                    action
                }
            });

            if (existingBookUser) {
                return res.status(400).json({
                    code: -101,
                    msg: 'Este libro ya está agregado con la misma acción para este usuario'
                });
            }

            await BooksUsers.create({
                user_id,
                book_id:id_book,
                action
            })
            return res.status(200).json({
                code: 6,
                msg: 'Libro agregado al usuario correctamente',
                data: { book: existingBook, bookUser: { user_id, book_id: id_book, action } }
            });
        }
        
    }
    catch (error){
    console.error(error)
    res.status(500).json({
        code:-100,
        msg: 'Ha ocurrido un error al agregar el libro o asociar al usuario',
        error: error
    })

}

console.log("holaa")
}

export const getBooks = async (req, res)=> {
    try {
        const errors = validationResult(req)

        if(!errors.isEmpty()){
            return res.status(400).json({errors:errors.array()});
        }
        console.log('Received user_id:', req.params.id);

        const books = await BooksUsers.findAll({
            where:{
                user_id:req.params.id,
                action:req.query.action
            },
            include: [
                {
                    model: Book, // Relacionamos la tabla BooksUsers con la tabla Book
                    attributes: ['id_book','external_id_api','title', 'author', 'publishers','isbn','number_of_pages', 'cover'], // Los atributos que deseas incluir del modelo Book
                }
            ]
        });

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
            error:error
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

        
        const {
            external_id_api,
            user_id,
            title,
            author,
            isbn,
            number_of_pages,
            cover,
            publishers,
            subject,
            favorite} = req.body
    try {
        const book = await Book.findOne({where:{external_id_api:external_id_api}})
        if(!book){
            book = await Book.create({
                external_id_api,
                user_id,
                title,
                author,
                isbn,
                number_of_pages,
                cover,
                publishers,
                subject,
                favorite
            })
            return res.status(404).json({
                code:-100,
                msg: 'Libro no encontrado en la base de datos y agregado'
            })
        }

        await book.update({favorite})
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
        const user_id = req.user.id_user
        console.log(user_id, "este es el user_id")
        console.log('Received book_id:', id);

        const bookUserEntry = await BooksUsers.findOne({
            where: { book_id: id , user_id: user_id}
        })
        console.log(bookUserEntry)
        if(!bookUserEntry){
            return res.status(404).json({
                code:-100,
                msg: 'No se ha encontrado el libro en la base de datos',
                error: bookUserEntry
            })
        }

        await bookUserEntry.destroy()

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


