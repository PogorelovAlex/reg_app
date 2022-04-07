import { createUserController } from './user.controllers/createUser.controller';
import { findAllUsersController } from './user.controllers/findAllUsers.controller';


const userController = {
  createUser: createUserController,
  findAllUsers: findAllUsersController
};

export default userController;
