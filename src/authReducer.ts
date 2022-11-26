import {authAPI, LoginDataType, RegistrationDataType, UserDataType} from "./cardsAPI";
import {Dispatch} from "redux";

export type AuthActionsType = SetRegistrationDataType | SetLoginDataType | SetIsLoggedInType

const initialState = {
    registrationData: {},
    userData: {},
    isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case "AUTH/SET-REGISTRATION-DATA": {
            return {...state, registrationData: action.registrationData}
        }
        case "AUTH/SET-LOGIN-DATA": {
            return {...state, userData: action.userData}
        }
        case "AUTH/SET-IS-LOGGED-IN": {
            return {...state, isLoggedIn: action.isLoggedIn}
        }
        default: {
            return state
        }
    }
}

type SetRegistrationDataType = ReturnType<typeof setRegistrationData>
type SetLoginDataType = ReturnType<typeof setLoginData>
type SetIsLoggedInType = ReturnType<typeof setIsLoggedIn>

export const setRegistrationData = (registrationData: RegistrationDataType) => ({
    type: 'AUTH/SET-REGISTRATION-DATA',
    registrationData
} as const)
export const setLoginData = (userData: UserDataType) => ({type: 'AUTH/SET-LOGIN-DATA', userData} as const)
export const setIsLoggedIn = (isLoggedIn: boolean) => ({type: 'AUTH/SET-IS-LOGGED-IN', isLoggedIn} as const)

export const register = (registrationData: RegistrationDataType) => (dispatch: Dispatch) => {
    authAPI.register(registrationData)
        .then((res) => dispatch(setRegistrationData(res.data)))
}
export const login = (loginData: LoginDataType) => (dispatch: Dispatch) => {
    authAPI.login(loginData)
        .then((res) => {
            dispatch(setIsLoggedIn(true))
            dispatch(setLoginData(res.data))
        })
}