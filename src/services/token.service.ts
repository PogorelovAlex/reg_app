import jwt from 'jsonwebtoken';
import Token from '../models/token.model';

import {
  JWT_ACCESS_SECRET,
  JWT_REFRESH_SECRET,
} from '../consts/secret.const';

const accessSecret = String(JWT_ACCESS_SECRET);
const refreshSecret = String(JWT_REFRESH_SECRET);

const generateTokens = (payload: { userId: number; userRole: string }) => {
  const accessToken = jwt.sign(payload, accessSecret, {
    expiresIn: '5m',
  });
  const refreshToken = jwt.sign(payload, refreshSecret, {
    expiresIn: '5d',
  });

  return {
    accessToken,
    refreshToken,
  };
};

const saveToken = async (id:number,refreshToken:string,userId:number) => {
  
  const tokenData = await Token.findOne({
            where: {
                userId,
            },
          });
        if(tokenData){
            tokenData.refresToken = refreshToken;
            return tokenData.save();
        }
        const token = await Token.create({
            id,
            refreshToken,
            userId
        })
        return token
  }

const validateAccessToken = (token: string) => {
  try {
    const userData = jwt.verify(token, accessSecret);
    if (!userData) throw new Error();
    return userData;
  } catch (e) {
    return null;
  }
};

const validateRefreshToken = (token: string) => {
  try {
    const userData = jwt.verify(token, refreshSecret);
    if (!userData) throw new Error();
    return userData;
  } catch (e) {
    return null;
  }
};
const removeToken =  async (refreshToken:string) => {
  const tokenData = await Token.destroy({
            where: {
                refreshToken,
            },
          })
        return tokenData;
}

const tokenService = {
  generateTokens,
  saveToken,
  validateAccessToken,
  validateRefreshToken,
  removeToken
};

export default tokenService;
