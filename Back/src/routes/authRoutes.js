import {Router} from 'express';
import { register, login,forgotPassword, changePassword, logout } from '../controllers/authController.js';
import { loginValidator, registerValidator } from '../validations/auth.Validation.js';


const router = Router()

//rutas URL
router.post('/register', registerValidator, register);
router.post('/login', loginValidator,login);
router.post('/forgot-password', forgotPassword);
router.post('/change-password', changePassword);
router.post('/logout', logout);

export default router;