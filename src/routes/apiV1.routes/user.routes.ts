import { Router } from 'express';
import { createUserController, createUserTableController } from '../../controllers/user.controllers/createUser.controller';
import  userController from '../../controllers/user.controller'
import authMiddleware from '../../middleware/auth.middleware';
const userRouter = Router();

// Create a new sample of data
userRouter.post('/data/define', createUserController);
userRouter.get('/data/table', createUserTableController);
userRouter.get('/',userController.findAllUsers);
export default userRouter;
