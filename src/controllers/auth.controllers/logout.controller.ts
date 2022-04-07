import { Request, Response } from 'express';

import logoutService from '../../services/auth.services/logout.service';


const logoutController = async (req: Request, res: Response) => {
  try {
    const {refreshToken} = req.cookies;
    const token = await logoutService(refreshToken);
    res.clearCookie('refreshToken');
    return res.json(token);
  } catch (e) {
    const errorMessage = (e as Error).message;
    return res.status(400).json({ message: errorMessage });
  }
};

export default logoutController;
