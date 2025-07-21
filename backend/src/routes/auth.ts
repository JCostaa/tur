import { Router } from 'express';
import { AuthController } from '../controllers/AuthController.js';

const router = Router();
const authController = new AuthController();

// Login route
router.post('/login', AuthController.validateLogin(), authController.login.bind(authController));

// Register route
router.post('/register', AuthController.validateRegister(), authController.register.bind(authController));

// Validate token route
router.get('/validate', authController.validateToken.bind(authController));

export default router; 