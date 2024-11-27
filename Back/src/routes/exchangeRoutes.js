import {Router} from 'express';
import { getExchange, addExchange, getExchangeId, updateExchange, deleteExchange } from '../controllers/exchangeController.js';



const router = Router()

//rutas URL
router.get('/', getExchange);
router.get('/:id', getExchangeId);
router.post('/', addExchange);
router.patch('/:id', updateExchange);
router.delete('/:id', deleteExchange);

export default router;