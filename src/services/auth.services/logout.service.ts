import tokenService from "../token.service";


const logoutService = async(refreshToken:string) => {
    const token = await tokenService.removeToken(refreshToken);
    return token;
}

export default logoutService;