import Token from '../../models/token.model';
import User from '../../models/user.model';

const findAllUsersService = async () => {
  const users = await User.findAll({
    where: {
        role:'user',
    },
  });
  return users
};

export { findAllUsersService };