import { Request, Response } from 'express';

import { USERS_NOT_FOUND } from '../../consts/user.const';

import authService from '../../services/auth.service';
import loginService from '../../services/auth.services/login.service';
import tokenService from '../../services/token.service';

const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const authStatus = await authService.login(
      email as string,
      password as string
    );

    if (!authStatus.success)
      return res.status(400).json({ message: authStatus.message });

    const userData = await loginService.getAuthUserData(
      email as string,
      password as string
    );

    if (!userData) throw new Error(USERS_NOT_FOUND);

    const jwtTokens = tokenService.generateTokens({
      userId: userData.id,
      userRole: userData.role,
    });

    await tokenService.saveToken(userData.id, jwtTokens.refreshToken,userData.id);
    res.cookie('refreshToken', jwtTokens.refreshToken, {
      maxAge: 5 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    return res.status(200).json({
      accessToken: jwtTokens.accessToken,
      user: userData,
    });
  } catch (e) {
    const errorMessage = (e as Error).message;
    return res.status(400).json({ message: errorMessage });
  }
};

export default loginController;
