import Token from '../../models/token.model';
import User from '../../models/user.model';

const createUserService = async (
  name: string,
  email: string,
  password: string,
  verifyToken: string
) => {
  await User.create({
    name,
    email,
    password,
    verifyToken,
  });
};

const createUsersTable = async () => {
  await User.sync({ force: true });
  await Token.sync({ force: true });
};


export { createUserService, createUsersTable };
