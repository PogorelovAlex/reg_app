import { Request, Response } from 'express';

import { AUTH_SOMETHING_WENT_WRONG } from '../../consts/auth.const';

import authService from '../../services/auth.service';

async function verifyEmailController(req: Request, res: Response) {
  try {
    const verifiedUser = await authService.verifyEmail(
      req.query.token as string
    );
    if (verifiedUser.success) {
      res.status(200).json({ message: verifiedUser.message });
    } else {
      res.status(400).json({ message: verifiedUser.message });
    }
  } catch (error) {
    res.status(400).json({ message: AUTH_SOMETHING_WENT_WRONG });
  }
}

export default verifyEmailController;
