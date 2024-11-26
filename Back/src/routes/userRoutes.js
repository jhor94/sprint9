import {Router} from 'express';
import { getUsers } from '../controllers/userController.js';


const router = Router()

//rutas URL
router.get('/', getUsers);
/*router.get('/:id', getBookById);
router.post('/', addBook);
router.patch('/:id', updateBook);
router.delete('/:id', deleteBook);
router.get('/populares', getBooks);*/

export default router;