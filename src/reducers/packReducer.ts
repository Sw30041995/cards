import {
    CardsPackRequestType,
    CardsPacksResponseType,
    ErrorResponseType,
    packAPI,
    UpdatePackTitleRequestType
} from "../api/cardsAPI";
import {AppThunk} from "../app/store";
import {AxiosError} from "axios";
import {setError} from "./authReducer";

export type PackActionsType = SetCardPacksType

const initialState = {} as CardsPacksResponseType
type InitialStateType = typeof initialState

export const packReducer = (state: InitialStateType = initialState, action: PackActionsType): InitialStateType => {
    switch (action.type) {
        case 'PACK/SET-CARD-PACKS': {
            return {...state, ...action.cardPacksData}
        }
        default: {
            return state
        }
    }
}

type SetCardPacksType = ReturnType<typeof setCardPacks>

export const setCardPacks = (cardPacksData: CardsPacksResponseType) => ({
    type: 'PACK/SET-CARD-PACKS',
    cardPacksData
} as const)

export const getAllPacks = (page: number): AppThunk => (dispatch) => {
    packAPI.getAllPacks(page)
        .then(res => dispatch(setCardPacks(res.data)))
        .catch((e: AxiosError<ErrorResponseType>) => {
            dispatch(setError(e.response?.data.error ? e.response.data.error : e.message))
        })
}
export const getMyPacks = (userId: string, page: number): AppThunk => (dispatch) => {
    packAPI.getMyPacks(userId, page)
        .then(res => dispatch(setCardPacks(res.data)))
        .catch((e: AxiosError<ErrorResponseType>) => {
            dispatch(setError(e.response?.data.error ? e.response.data.error : e.message))
        })
}
export const createCardsPack = (cardsPack: CardsPackRequestType): AppThunk => (dispatch) => {
    packAPI.createCardsPack(cardsPack)
        .then(() => dispatch(getAllPacks(1)))
}
export const deleteCardsPack = (packId: string): AppThunk => (dispatch) => {
    packAPI.deleteCardsPack(packId)
        .then(() => dispatch(getAllPacks(1)))
}
export const updateCardsPackTitle = (updatePackTitleData: UpdatePackTitleRequestType): AppThunk => (dispatch) => {
    packAPI.updateCardsPackTitle(updatePackTitleData)
        .then(() => dispatch(getAllPacks(1)))
}