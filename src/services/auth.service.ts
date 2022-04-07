import loginService from './auth.services/login.service';
import signupService from './auth.services/signup.service';
import verifyEmailService from './auth.services/verifyEmail.service';
import logoutService from './auth.services/logout.service';

const authService = {
  signup: signupService,
  login: loginService.login,
  verifyEmail: verifyEmailService,
  logout:logoutService
};

export default authService;
