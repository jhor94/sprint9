import {Router} from 'express';
import { getUsers, register } from '../controllers/userController.js';


const router = Router()

//rutas URL
router.get('/', getUsers);
/*router.get('/:id', getBookById);*/
router.post('/', register);
/*router.patch('/:id', updateBook);
router.delete('/:id', deleteBook);
router.get('/populares', getBooks);*/

export default router;