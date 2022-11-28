import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "./hooks";
import {setError} from "./authReducer";

export const ErrorMessage = () => {

    const dispatch = useAppDispatch()
    const error = useAppSelector<string>(state => state.auth.error)

    useEffect(() => {
        let timeoutId = setTimeout(() => {
            dispatch(setError(''))
        }, 6000)
        return () => {
            clearTimeout(timeoutId)
        }
    }, [error])

    const hide = error ? 'showErrorBlock' : 'hideErrorBlock'

    return (
        <div onClick={() => dispatch(setError(''))} className={`${hide} errorBlock`}>
            {error}
        </div>
    )
}