import bcrypt from 'bcrypt';

import { AUTH_SIGNUP_EMAIL_USED } from '../../consts/auth.const';
import { generateToken } from '../../utils/fn.util';
import User from '../../models/user.model';

const signupService = async (name: string, email: string, password: string) => {
  try {
    const existingUser = await User.findOne({
      where: {
        email,
      },
    });

    if (existingUser?.isActive) {
      throw new Error(AUTH_SIGNUP_EMAIL_USED);
    }

    const tokenLength = 16;
    const verifyToken = generateToken(tokenLength);
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    console.log(password);
    console.log(hashedPassword);

    if (existingUser) {
      existingUser.name = name;
      existingUser.password = hashedPassword;
      existingUser.verifyToken = verifyToken;
      await existingUser.save();

      return existingUser;
    }

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      verifyToken,
    });

    return newUser;
  } catch (e) {
    const errorMessage = (e as Error).message;
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
};

export default signupService;

