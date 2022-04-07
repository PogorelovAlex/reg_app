import loginController from './auth.controllers/login.controller';
import signupController from './auth.controllers/signup.controller';
import verifyEmailController from './auth.controllers/verifyEmail.controller';
import refreshController from './auth.controllers/refresh.controller';
import logoutController from './auth.controllers/logout.controller';

const authController = {
  signup: signupController,
  login: loginController,
  logout:logoutController,
  verifyEmail: verifyEmailController,
  refresh: refreshController,
};

export default authController;
