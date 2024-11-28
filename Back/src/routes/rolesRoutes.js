import {Router} from 'express';
import { authenticateToken } from '../middlewares/authenticateToken.js';
import { allAccess, userBoard, moderatorBoard, adminBoard } from '../controllers/rolesController.js';


const router = Router()

//rutas URL
router.get('/all', allAccess);
router.get('/user', authenticateToken(['user']), userBoard);
router.get('/mod',  authenticateToken(['mod','admin']), moderatorBoard);
router.get('/admin', authenticateToken(['admin']), adminBoard);

export default router;