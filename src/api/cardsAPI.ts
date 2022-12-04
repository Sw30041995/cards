import axios, {AxiosResponse} from "axios";

const instance = axios.create({
    // baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    // baseURL: process.env.NODE_ENV === 'development' ? 'http://localhost:7542/2.0/' : 'https://neko-back.herokuapp.com/2.0/',
    baseURL: 'https://neko-back.herokuapp.com/2.0/',
    withCredentials: true
})

export const authAPI = {
    register(registrationData: RegistrationDataType) {
        return instance.post<RegistrationDataType, AxiosResponse<UserDataType>>('auth/register', registrationData)
    },
    login(loginData: LoginDataType) {
        return instance.post<LoginDataType, AxiosResponse<UserDataType>>('auth/login', loginData)
    },
    checkAuth() {
        return instance.post<{}, AxiosResponse<UserDataType>>('auth/me', {})
    },
    logOut() {
        return instance.delete<CommonResponseType>('auth/me')
    },
    updateProfileData(profileData: ProfileUpdateDataType) {
        return instance.put<ProfileUpdateDataType, AxiosResponse<ResponseType>>('auth/me', profileData)
    },
    restorePassword(passwordUpdateData: PasswordUpdateDataType) {
        return instance.post<PasswordUpdateDataType, AxiosResponse<CommonResponseType>>('auth/forgot', passwordUpdateData)
    },
    setNewPassword(newPasswordData: NewPasswordDataType) {
        return instance.post<NewPasswordDataType, AxiosResponse<CommonResponseType>>('auth/set-new-password', newPasswordData)
    }
}

export const packAPI = {
    getAllPacks(page: number) {
        return instance.get<CardsPacksResponseType>(`cards/pack?pageCount=8&page=${page}`)
    },
    getMyPacks(userId: string, page: number) {
        return instance.get<CardsPacksResponseType>(`cards/pack?user_id=${userId}&pageCount=8&page=${page}`)
    },
    createCardsPack(cardsPack: CardsPackRequestType) {
        return instance.post<CardsPackRequestType, AxiosResponse<CardPackType>>(`cards/pack`, {cardsPack})
    },
    deleteCardsPack(packId: string) {
        return instance.delete<string>(`cards/pack?id=${packId}`)
    },
    updateCardsPackTitle(cardsPack: UpdatePackTitleRequestType) {
        return instance.put<UpdatePackTitleRequestType>(`cards/pack`, {cardsPack})
    }
}

export const cardAPI = {
    getCards(cardsPackId: string, page: number) {
        return instance.get<CardsResponseType>(`cards/card?cardsPack_id=${cardsPackId}&pageCount=8&page=${page}`)
    },
    createNewCard(card: CardRequestType) {
        return instance.post<CardRequestType>('cards/card', {card})
    },
    deleteCard(cardId: string) {
        return instance.delete(`cards/card?id=${cardId}`)
    },
    updateCardData(card: UpdateCardRequestType) {
        return instance.put('cards/card', {card})
    }
}

export type UpdateCardRequestType = {
    _id: string
    question?: string
    answer?: string
}

export type CardRequestType = {
    cardsPack_id: string
    question: string
    answer: string
    grade?: number
    shots?: number
    answerImg?: string
    questionImg?: string
    questionVideo?: string
    answerVideo?: string
}

export type UpdatePackTitleRequestType = {
    _id: string
    name: string
}

export type CardsResponseType = {
    cards: CardType[]
    cardsTotalCount: number
    maxGrade: number
    minGrade: number
    page: number
    pageCount: number
    packUserId: string
}

export type CardType = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    shots: 1
    user_id: string
    created: string
    updated: string
    _id: string
}

export type CardsPackRequestType = {
    name: string
    deckCover?: string
    private: boolean
}

export type CardsPacksResponseType = {
    cardPacks: CardPackType[]
    page: number
    pageCount: number
    cardPacksTotalCount: number
    minCardsCount: number
    maxCardsCount: number
    token: string
    tokenDeathTime: number
}

export type CardPackType = {
    _id: string
    user_id: string
    user_name: string
    private: boolean
    name: string
    path: string
    grade: number
    shots: number
    cardsCount: number
    type: string
    rating: number
    created: string
    updated: string
    more_id: string
    __v: number
    deckCover: string
}

export type PasswordUpdateDataType = {
    email: string
    from: string
    message: string
}

export type NewPasswordDataType = {
    password: string
    resetPasswordToken: string
}

export type RegistrationDataType = {
    email: string
    password: string
}

export type ErrorResponseType = {
    password?: string
    email?: string
    error: string
    in: string
}

export type LoginDataType = {
    email: string
    password: string
    rememberMe: boolean
}

export type UserDataType = {
    avatar: string
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

export type ProfileUpdateDataType = {
    name: string
    avatar: string
}

export type CommonResponseType = {
    info: string
}

export type ResponseType = {
    token: string
    tokenDeathTime: number
    updatedUser: UserDataType
}


// email:"s25@ya.qw"
// password:"rerewwrerewer"

// email:"dfdffd@gffg.trrt"
// password:"fdfdfddf"