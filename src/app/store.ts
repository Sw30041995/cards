import {applyMiddleware, combineReducers, legacy_createStore} from "redux";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk";
import {AuthActionsType, authReducer} from "../reducers/authReducer";
import {PackActionsType, packReducer} from "../reducers/packReducer";
import {CardActionsType, cardReducer} from "../reducers/cardReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    pack: packReducer,
    card: cardReducer
})

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))
export type AppRootStateType = ReturnType<typeof store.getState>
type AppActionsType = AuthActionsType | PackActionsType | CardActionsType
export type AppDispatch = ThunkDispatch<AppRootStateType, unknown, AppActionsType>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>

