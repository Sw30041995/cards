import TextField from '@mui/material/TextField/TextField';
import React, {ChangeEvent, useState} from 'react';
import {Navigate, useParams} from 'react-router-dom';
import {Button} from "../Button";
import {validation} from "../validation";
import {setNewPassword} from "../authReducer";
import {useAppDispatch, useAppSelector} from "../hooks";

type ErrorType = {
    password: string
}

export const PasswordUpdate = () => {

    const {token} = useParams()

    const dispatch = useAppDispatch()
    const passwordChanged = useAppSelector<boolean>(state => state.auth.passwordChanged)
    const [password, setPassword] = useState('')
    const [error, setError] = useState<ErrorType>({} as ErrorType)

    const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
        setError({...error, password: ''})
    }

    const updatePassword = () => {
        if (!password) {
            setError({...error, password: 'Required'})
            return
        }
        if (error.password) {
            return
        }
        dispatch(setNewPassword({password, resetPasswordToken: token!}))
    }

    if (passwordChanged) {
        // dispatch(setLetterStatus(false))
        return <Navigate to='/'/>
    }

    return (
        <div>
            <div className='container'>
                <div className='login newPasswordEnteringForm'>
                    <h1 className='title'>Create new password</h1>
                    <div>
                        <TextField error={!!error.password}
                                   onBlur={() => validation.passwordCheck(setError, error, password)}
                                   value={password}
                                   onChange={passwordChangeHandler} className='textField' type='password'
                                   label={error.password ? error.password : "Password"} variant="standard"/>
                        <p className='instructions'>Create new password and we will send you further instructions to
                            email</p>
                    </div>
                    <Button onClick={updatePassword} className='stretch'>Create new password</Button>
                </div>
            </div>
        </div>
    )
}