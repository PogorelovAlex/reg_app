import { Request, Response } from 'express';
import {
    API_URL
  } from '../../consts/secret.const';

import authService from '../../services/auth.service';
import sendEmailService from '../../services/emailer.service';
import tokenService from '../../services/token.service';
import {
  AUTH_SIGNUP_FAILURE,
} from '../../consts/auth.const';
import { EMAILER_FAILURE } from '../../consts/emailer.const';

const signupController = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;
    const name = req.body.name || 'Stranger';
    const user = await authService.signup(name, email, password);

    const jwtTokens = tokenService.generateTokens({
      userId: user.id,
      userRole: user.role,
    });

    await tokenService.saveToken(user.id, jwtTokens.refreshToken,user.id);
    res.cookie('refreshToken', jwtTokens.refreshToken, {
      maxAge: 5 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    if (user.verifyToken) {

      // emailer start
      const emailerResponse = await sendEmailService.sendActivationMail(email,`${API_URL}/api/v1/auth/verify?token=${user.verifyToken}`);

      if (emailerResponse) {
        res.status(201).json({...jwtTokens,user: user});
        return;
      }
      throw new Error(EMAILER_FAILURE);
    }
    throw new Error(AUTH_SIGNUP_FAILURE);
  } catch (e) {
    res.status(500).json({ message: (e as Error).message });
  }
};

export default signupController;
