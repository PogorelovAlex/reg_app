import { Router } from 'express';

import authController from '../../controllers/auth.controller';
import authMiddleware from '../../middleware/auth.middleware';

const authRouter = Router();

authRouter.post('/signup', authMiddleware.signup, authController.signup);
authRouter.post('/login', authMiddleware.login, authController.login);
authRouter.post('/logout',  authController.logout);
authRouter.get('/verify', authController.verifyEmail);
authRouter.get('/refresh', authController.refresh);


export default authRouter;
