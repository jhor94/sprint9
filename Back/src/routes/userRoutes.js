import {Router} from 'express';
import { getUsers, uploadPhoto } from '../controllers/userController.js';
import { uploadFileMiddleware } from '../middlewares/upload.js';
import { authenticateToken } from '../middlewares/authenticateToken.js';


const router = Router()

//rutas URL
router.get('/', getUsers);
router.post('/upload-photo',authenticateToken(["user"]), uploadFileMiddleware, uploadPhoto);

export default router;