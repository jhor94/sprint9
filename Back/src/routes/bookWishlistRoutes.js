import {Router} from 'express';
import { getWishBooks, fetchsaveBooks, addWishBook, deleteWishBook } from '../controllers/bookWishListController.js';
import { bookValidator } from '../validations/book.Validation.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';



const router = Router()

//rutas URL
router.get('/search', fetchsaveBooks);
router.get('/:id',authenticateToken(['user','mod','admin']),getWishBooks);
//router.get('/:id', getBookId);
router.post('/', addWishBook);
/*router.patch('/:external_id_api', updateBook);*/
router.delete('/:id',authenticateToken(['user','mod','admin']), deleteWishBook);

export default router;