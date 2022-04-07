import { Request, Response } from 'express';
import refreshTokenService from '../../services/auth.services/refresh.service';

import { AUTH_NOT_AUTHORIZED } from '../../consts/auth.const';

const refreshTokenController = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) throw new Error(AUTH_NOT_AUTHORIZED);

    const refreshedUser: { accessToken: string; refreshToken: string; user:any} =
      await refreshTokenService.refreshToken(refreshToken);

    res.cookie('refreshToken', refreshedUser.refreshToken, {
      maxAge: 5 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json({
      accessToken:refreshedUser.accessToken,
      refreshToken:refreshedUser.refreshToken, 
      user: refreshedUser.user
    });
  } catch (e) {
    const errorMessage = (e as Error).message;
    return res.status(400).json({ msg: errorMessage });
  }
};

export default refreshTokenController;
