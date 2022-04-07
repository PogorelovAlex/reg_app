import { DataTypes, Model } from 'sequelize';
import sequelize from '../db/db.config';
import User from './user.model'

interface TokenInstance extends Model {
  user: boolean;
  refresToken: string;
 
}

const Token = sequelize.define<TokenInstance>('tokens', {
  refreshToken: {
    type: DataTypes.STRING,
    allowNull: false,  
  },
});



export default Token;