import { NextFunction, Request, Response } from 'express';

export default (
  error: Error | string | any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(500).send(error.message);
};
