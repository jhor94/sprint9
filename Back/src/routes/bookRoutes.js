import {Router} from 'express';
import { getBooks, getBookId, fetchsaveBooks, addBook, updateBook, deleteBook } from '../controllers/bookController.js';



const router = Router()

//rutas URL
router.get('/search', fetchsaveBooks);
router.get('/', getBooks);
router.get('/:id', getBookId);
router.post('/', addBook);
router.patch('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;