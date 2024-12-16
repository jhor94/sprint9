import {Router} from 'express';
import { getBooks, getBookId, fetchsaveBooks, addBook, updateBook, deleteBook } from '../controllers/bookController.js';
import { bookValidator } from '../validations/book.Validation.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';



const router = Router()

//rutas URL
router.get('/search', fetchsaveBooks);
router.get('/:id',authenticateToken(['user','mod','admin']),getBooks);
//router.get('/:id', getBookId);
router.post('/', addBook);
router.patch('/:external_id_api', updateBook);
router.delete('/:id',authenticateToken(['user','mod','admin']), deleteBook);

export default router;