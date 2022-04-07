import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.config';
import Token from './token.model'

interface UserInstance extends Model {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  verifyToken: string;
  isActive: boolean;
}

const User = sequelize.define<UserInstance>('users', {
  name: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
  role: {
    type: DataTypes.STRING,
    defaultValue: 'user',
  },
  verifyToken: {
    type: DataTypes.STRING,
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: 'false',
  },
});
User.hasOne(Token,{
  foreignKey:{
    allowNull: false,
  }
  
});
Token.belongsTo(User);

export default User;
 