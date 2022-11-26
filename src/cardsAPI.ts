import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true,
})

export const authAPI = {
    register(registrationData: RegistrationDataType) {
        return instance.post<RegistrationDataType, AxiosResponse>('auth/register', registrationData)
    },
    login(loginData: LoginDataType) {
        return instance.post<LoginDataType, AxiosResponse<UserDataType>>('auth/login', loginData)
    }
}

export type RegistrationDataType = {
    email: string
    password: string
}

export type ErrorResponseType = {
    email: string
    error: string
    in: string
}

export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export type UserDataType = {
    created: string
    email: string
    isAdmin: boolean
    name: string
    publicCardPacksCount: number
    rememberMe: boolean
    token: string
    tokenDeathTime: number
    updated: string
    verified: boolean
    __v: number
    _id: string
}


// email:"s25@ya.qw"
// password:"rerewwrerewer"

// email:"dfdffd@gffg.trrt"
// password:"fdfdfddf"