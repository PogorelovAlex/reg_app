import { Request, Response } from 'express';

import userService from '../../services/user.service';

const findAllUsersController = async (req: Request, res: Response) => {
  // Validate request

  const users = await userService.findAllUsers();

  res.json(users);
};
const createUserTableController = async (req: Request, res: Response) => {
  // Validate request
  await userService.createUsersTable();
  res.send("All went good");
};
export { findAllUsersController };