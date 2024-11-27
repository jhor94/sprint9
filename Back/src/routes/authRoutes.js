import {Router} from 'express';
import { register, login,forgotPassword, changePassword, logout } from '../controllers/authController.js';


const router = Router()

//rutas URL
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/change-password', changePassword);
router.post('/logout', logout);

export default router;