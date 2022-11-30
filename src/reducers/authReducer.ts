import {
    authAPI,
    ErrorResponseType,
    LoginDataType,
    NewPasswordDataType,
    PasswordUpdateDataType,
    ProfileUpdateDataType,
    RegistrationDataType,
    UserDataType
} from "../api/cardsAPI";
import {AppThunk} from "../app/store";
import {AxiosError} from "axios";

export type AuthActionsType = SetLoginDataType | SetIsLoggedInType | SetIsInitializedType | SetRegistrationStatusType |
    SetUpdatedProfileDataType | SetErrorType | SetLetterStatusType | SetPasswordStatusType

const initialState = {
    registrationSuccessful: false,
    userData: {} as UserDataType,
    isLoggedIn: false,
    isInitialized: false,
    error: '',
    letterSent: false,
    passwordChanged: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: AuthActionsType): InitialStateType => {
    switch (action.type) {
        case "AUTH/SET-REGISTRATION-STATUS": {
            return {...state, registrationSuccessful: true}
        }
        case "AUTH/SET-LOGIN-DATA": {
            return {...state, userData: action.userData}
        }
        case "AUTH/SET-IS-LOGGED-IN": {
            return {...state, isLoggedIn: action.isLoggedIn}
        }
        case "AUTH/SET-IS-INITIALIZED": {
            return {...state, isInitialized: action.isInitialized}
        }
        case "AUTH/SET-UPDATED-PROFILE-DATA": {
            return {...state, userData: {...action.userData}}
        }
        case "AUTH/SET-ERROR": {
            return {...state, error: action.error}
        }
        case "AUTH/SET-LETTER-STATUS": {
            return {...state, letterSent: action.status}
        }
        case "AUTH/SET-PASSWORD-STATUS": {
            return {...state, passwordChanged: action.status}
        }
        default: {
            return state
        }
    }
}

type SetLoginDataType = ReturnType<typeof setLoginData>
type SetIsLoggedInType = ReturnType<typeof setIsLoggedIn>
type SetIsInitializedType = ReturnType<typeof setIsInitialized>
type SetRegistrationStatusType = ReturnType<typeof setRegistrationStatus>
type SetUpdatedProfileDataType = ReturnType<typeof setUpdatedProfileData>
type SetErrorType = ReturnType<typeof setError>
type SetLetterStatusType = ReturnType<typeof setLetterStatus>
type SetPasswordStatusType = ReturnType<typeof setPasswordStatus>

export const setLoginData = (userData: UserDataType) => ({type: 'AUTH/SET-LOGIN-DATA', userData} as const)
export const setIsLoggedIn = (isLoggedIn: boolean) => ({type: 'AUTH/SET-IS-LOGGED-IN', isLoggedIn} as const)
export const setIsInitialized = (isInitialized: boolean) => ({type: 'AUTH/SET-IS-INITIALIZED', isInitialized} as const)
export const setRegistrationStatus = (status: true) => ({type: 'AUTH/SET-REGISTRATION-STATUS', status} as const)
export const setUpdatedProfileData = (userData: UserDataType) => ({type: 'AUTH/SET-UPDATED-PROFILE-DATA', userData} as const)
export const setError = (error: string) => ({type: 'AUTH/SET-ERROR', error} as const)
export const setLetterStatus = (status: boolean) => ({type: 'AUTH/SET-LETTER-STATUS', status} as const)
export const setPasswordStatus = (status: boolean) => ({type: 'AUTH/SET-PASSWORD-STATUS', status} as const)

export const register = (registrationData: RegistrationDataType): AppThunk => (dispatch) => {
    authAPI.register(registrationData)
        .then(() => dispatch(setRegistrationStatus(true)))
        .catch((e: AxiosError<ErrorResponseType>) => {
            dispatch(setError(e.response?.data.error ? e.response.data.error : e.message))
        })
}
export const login = (loginData: LoginDataType): AppThunk => (dispatch) => {
    authAPI.login(loginData)
        .then((res) => {
            dispatch(setIsLoggedIn(true))
            dispatch(setLoginData(res.data))
        })
        .catch((e: AxiosError<ErrorResponseType>) => {
            dispatch(setError(e.response?.data.error ? e.response.data.error : e.message))
        })
}
export const checkAuth = (): AppThunk => (dispatch) => {
    authAPI.checkAuth()
        .then((res) => {
            dispatch(setIsLoggedIn(true))
            dispatch(setLoginData(res.data))
        })
        // .catch((e: AxiosError<ErrorResponseType>) => {
        //     dispatch(setError(e.response?.data.error ? e.response.data.error : e.message))
        // })
        .finally(() => dispatch(setIsInitialized(true)))
}
export const logOut = (): AppThunk => (dispatch) => {
    authAPI.logOut()
        .then(() => dispatch(setIsLoggedIn(false)))
        .catch((e: AxiosError<ErrorResponseType>) => {
            dispatch(setError(e.response?.data.error ? e.response.data.error : e.message))
        })
}
export const updateProfileData = (profileData: ProfileUpdateDataType): AppThunk => (dispatch) => {
    authAPI.updateProfileData(profileData)
        .then((res) => dispatch(setUpdatedProfileData(res.data.updatedUser)))
}
export const restorePassword = (passwordUpdateData: PasswordUpdateDataType): AppThunk => (dispatch) => {
    authAPI.restorePassword(passwordUpdateData)
        .then(() => {
            dispatch(setLetterStatus(true))
        })
        .catch((e: AxiosError<ErrorResponseType>) => {
            dispatch(setError(e.response?.data.error ? e.response.data.error : e.message))
        })
}
export const setNewPassword = (newPasswordData: NewPasswordDataType): AppThunk => (dispatch) => {
    authAPI.setNewPassword(newPasswordData)
        .then(() => {
            dispatch(setPasswordStatus(true))
        })
        .catch((e: AxiosError<ErrorResponseType>) => {
            dispatch(setError(e.response?.data.error ? e.response.data.error : e.message))
        })
}