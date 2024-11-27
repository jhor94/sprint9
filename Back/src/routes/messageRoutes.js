import {Router} from 'express';
import { getMessage, addMessage, getMessageId, updateMessage, deleteMessage } from '../controllers/messageController.js';



const router = Router()

//rutas URL
router.get('/', getMessage);
router.get('/:id', getMessageId);
router.post('/', addMessage);
router.patch('/:id', updateMessage);
router.delete('/:id', deleteMessage);

export default router;