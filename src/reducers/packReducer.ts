import {CardsPackRequestType, CardsPacksResponseType, ErrorResponseType, packAPI} from "../api/cardsAPI";
import {AppThunk} from "../app/store";
import {AxiosError} from "axios";
import {setError} from "./authReducer";

export type PackActionsType = SetCardPacksType | SetMyCardPacksType

const initialState = {} as CardsPacksResponseType
type InitialStateType = typeof initialState

export const packReducer = (state: InitialStateType = initialState, action: PackActionsType): InitialStateType => {
    switch (action.type) {
        case 'PACK/SET-CARD-PACKS': {
            return {...state, ...action.cardPacksData}
        }
        case "PACK/SET-MY-CARD-PACKS": {
            return {...state, cardPacks: action.cardPacksData.cardPacks.filter(p => p.user_id === action.userId)}
        }
        default: {
            return state
        }
    }
}

type SetCardPacksType = ReturnType<typeof setCardPacks>
type SetMyCardPacksType = ReturnType<typeof setMyCardPacks>

export const setCardPacks = (cardPacksData: CardsPacksResponseType) => ({type: 'PACK/SET-CARD-PACKS', cardPacksData} as const)
export const setMyCardPacks = (cardPacksData: CardsPacksResponseType, userId: string) => ({type: 'PACK/SET-MY-CARD-PACKS', cardPacksData, userId} as const)

export const getPacks = (page: number): AppThunk => (dispatch) => {
    packAPI.getPacks(page)
        .then(res => dispatch(setCardPacks(res.data)))
        .catch((e: AxiosError<ErrorResponseType>) => {
            dispatch(setError(e.response?.data.error ? e.response.data.error : e.message))
        })
}
export const getMyPacks = (userId: string): AppThunk => (dispatch) => {
    packAPI.getPacks(1)
        .then(res => dispatch(setMyCardPacks(res.data, userId)))
        .catch((e: AxiosError<ErrorResponseType>) => {
            dispatch(setError(e.response?.data.error ? e.response.data.error : e.message))
        })
}
export const createCardsPack = (cardsPack: CardsPackRequestType): AppThunk => (dispatch) => {
    packAPI.createCardsPack(cardsPack)
        .then(res => dispatch(getPacks(res.data.cardPacksData.page)))
}