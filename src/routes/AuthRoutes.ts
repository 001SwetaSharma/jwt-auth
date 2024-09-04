import express from 'express';
import { AuthController } from '../controllers/AuthController';
import { authenticateToken } from '../middlewares/AuthMiddleware';
const authRoutes = express.Router();
const authController = new AuthController()


authRoutes.post('/register', authController.register);
authRoutes.post('/login', authController.login);
authRoutes.get('/profile', authenticateToken, authController.profile)

export default authRoutes;
