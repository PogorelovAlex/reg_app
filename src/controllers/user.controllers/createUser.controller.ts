import { Request, Response } from 'express';

import userService from '../../services/user.service';

const createUserController = async (req: Request, res: Response) => {
  // Validate request

  if (!req.body) {
    res.status(400).send('Content can not be empty!');
    return;
  }
  const user = await userService.createUser(
    req.body.name,
    req.body.email,
    req.body.password,
    req.body.verifyToken
  );

  res.send(user);
};
const createUserTableController = async (req: Request, res: Response) => {
  // Validate request
  await userService.createUsersTable();
  res.send("All went good");
};
export { createUserController, createUserTableController };
