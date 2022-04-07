import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import tokenService from '../services/token.service';

import {
  AUTH_INVALID_CONFIRM_PASSWORD,
  AUTH_INVALID_NAME,
  AUTH_INVALID_PASSWORD,
  AUTH_REQUIRED_FIELDS_EMPTY,
  AUTH_NOT_AUTHORIZED,
  INVALID_TOKEN
} from '../consts/auth.const';
import { EMAILER_INVALID_EMAIL } from '../consts/emailer.const';
import {
  getConfirmValidator,
  getEmailValidator,
  getNameValidator,
  getPasswordValidator,
  getStringFieldValidator,
} from './validators/auth.validator';

const emailField = 'email';
const nameField = 'name';
const passwordField = 'password';
const confirmPasswordField = 'confirmPassword';

const signup = [
  getEmailValidator(emailField, EMAILER_INVALID_EMAIL),
  getNameValidator(nameField, AUTH_INVALID_NAME),
  getPasswordValidator(passwordField, AUTH_INVALID_PASSWORD),
  getConfirmValidator(
    confirmPasswordField,
    passwordField,
    AUTH_INVALID_CONFIRM_PASSWORD
  ),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    next();
  },
];

const login = [
  getEmailValidator(emailField, EMAILER_INVALID_EMAIL),
  getStringFieldValidator(passwordField, AUTH_REQUIRED_FIELDS_EMPTY),
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    next();
  },
];

const jwtCheck = [
  (req: Request, res: Response, next: NextFunction) => {
    try {
    const authHeader = req.headers.authorization;

    if (!authHeader) throw INVALID_TOKEN;

    const accessToken = authHeader.split(' ')[1];
    if (!accessToken) throw INVALID_TOKEN;

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) throw INVALID_TOKEN;

    next();

    } catch (e) {
      res.status(401).json({ message: AUTH_NOT_AUTHORIZED });
    }
  },
];
const roleCheck = (roles: Array<string>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) throw 'User is not authorized';

      const tokenInfo: any = tokenService.validateAccessToken(token);
      console.log(tokenInfo)
      let hasRole = false;

      if (roles.includes(tokenInfo.role)) hasRole = true;

      if (!hasRole) throw 'You have no permission';

      next();
    } catch (e) {
      res.status(401).json({ msg: e });
    }
  };
};


const authMiddleware = {
  signup,
  login,
  jwtCheck,
  roleCheck,
};

export default authMiddleware;
