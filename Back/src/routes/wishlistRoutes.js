import {Router} from 'express';
import { getWishlist, addWishlist, getWishlistId, deleteBookWishlist, deleteAllWishlist } from '../controllers/wishlistController.js';



const router = Router()

//rutas URL
router.get('/', getWishlist);
router.get('/:id', getWishlistId);
router.post('/', addWishlist);
router.delete('/book/:id', deleteBookWishlist);
router.delete('/:id', deleteAllWishlist);

export default router;