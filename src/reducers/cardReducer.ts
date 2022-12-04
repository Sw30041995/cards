import {cardAPI, CardRequestType, CardsResponseType, ErrorResponseType, UpdateCardRequestType} from "../api/cardsAPI";
import {AppThunk} from "../app/store";
import {AxiosError} from "axios";
import {setError} from "./authReducer";

export type CardActionsType = SetCardsType

const initialState = {} as CardsResponseType
type InitialStateType = typeof initialState

export const cardReducer = (state: InitialStateType = initialState, action: CardActionsType): InitialStateType => {
    switch (action.type) {
        case 'PACK/SET-CARDS': {
            return {...state, ...action.cardsData}
        }
        default: {
            return state
        }
    }
}

type SetCardsType = ReturnType<typeof setCards>

export const setCards = (cardsData: CardsResponseType) => ({type: 'PACK/SET-CARDS', cardsData} as const)

export const getCards = (cardsPackId: string, page: number): AppThunk => (dispatch) => {
    cardAPI.getCards(cardsPackId, page)
        .then(res => dispatch(setCards(res.data)))
        .catch((e: AxiosError<ErrorResponseType>) => {
            dispatch(setError(e.response?.data.error ? e.response.data.error : e.message))
        })
}
export const createNewCard = (card: CardRequestType): AppThunk => (dispatch) => {
    cardAPI.createNewCard(card)
        .then(() => dispatch(getCards(card.cardsPack_id, 1)))
        .catch((e: AxiosError<ErrorResponseType>) => {
            dispatch(setError(e.response?.data.error ? e.response.data.error : e.message))
        })
}
export const deleteCard = (cardId: string): AppThunk => (dispatch) => {
    cardAPI.deleteCard(cardId)
        .then((res) => {
            dispatch(getCards(res.data.deletedCard.cardsPack_id, 1))
        })
        .catch((e: AxiosError<ErrorResponseType>) => {
            dispatch(setError(e.response?.data.error ? e.response.data.error : e.message))
        })
}
export const updateCardData = (card: UpdateCardRequestType): AppThunk => (dispatch) => {
    cardAPI.updateCardData(card)
        .then((res) => {
            dispatch(getCards(res.data.updatedCard.cardsPack_id, 1))
        })
        .catch((e: AxiosError<ErrorResponseType>) => {
            dispatch(setError(e.response?.data.error ? e.response.data.error : e.message))
        })
}
