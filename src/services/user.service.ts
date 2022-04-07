import { createUserService, createUsersTable} from './user.services/createUser.service';
import { findAllUsersService } from './user.services/findAllUsers.service';

const userService = {
  createUser: createUserService,
  createUsersTable: createUsersTable,
  findAllUsers: findAllUsersService
};

export default userService;
