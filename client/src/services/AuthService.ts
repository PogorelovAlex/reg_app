import api from "../http";
import {AxiosResponse} from 'axios';
import {AuthResponse} from "../models/response/AuthResponse";

export default class AuthService {
    static async login(email: string, password: string): Promise<AxiosResponse<AuthResponse>> {
        return api.post<AuthResponse>('/auth/login', {email, password})
    }

    static async signup(name:string,email: string, password: string, confirmPassword:string): Promise<AxiosResponse<AuthResponse>> {
        return api.post<AuthResponse>('/auth/signup', {name, email, password, confirmPassword})
    }

    static async logout(): Promise<void> {
        return api.post('/auth/logout')
    }
    static async getApiInfo(): Promise<AxiosResponse<AuthResponse>> {
        return api.get('/')
    }
    

}