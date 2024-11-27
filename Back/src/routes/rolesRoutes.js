import {Router} from 'express';
import { allAccess, userBoard, moderatorBoard, adminBoard } from '../controllers/rolesController.js';


const router = Router()

//rutas URL
router.get('/all', allAccess);
router.get('/user', userBoard);
router.get('/mod', moderatorBoard);
router.get('/admin', adminBoard);

export default router;