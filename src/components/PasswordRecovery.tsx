import TextField from '@mui/material/TextField/TextField';
import React, {ChangeEvent, useState} from 'react';
import {Button} from "../Button";
import {Link, Navigate} from "react-router-dom";
import {restorePassword} from "../authReducer";
import {useAppDispatch, useAppSelector} from "../hooks";
import {validation} from "../validation";

type ErrorType = {
    email: string
}

export const PasswordRecovery = () => {

    const dispatch = useAppDispatch()
    const letterSent = useAppSelector<boolean>(state => state.auth.letterSent)
    const [email, setEmail] = useState('')
    const [errors, setErrors] = useState<ErrorType>({} as ErrorType)

    const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
        setErrors({...errors, email: ''})
    }

    const sendInstruction = () => {
        if (!email) {
            setErrors({...errors, email: 'Required'})
            return
        }
        if (errors.email) {
            return
        }
        dispatch(restorePassword({
            email, from: "test-front-admin <ai73a@yandex.by>",
            message: (
                `<div style="background-color: lime; padding: 15px">password recovery link: 
                 <a href='http://localhost:3000/password-update/$token$'>Change password</a>
                 </div>`)
        }))
    }

    if (letterSent) {
        return <Navigate state={{email}} to='/password-recovery/sending-letter'/>
    }

    return (
        <div>
            <div className='container'>
                <div className='login passwordRecoveryForm'>
                    <h1 className='title'>Forgot your password?</h1>
                    <div>
                        <TextField error={!!errors.email} onChange={emailChangeHandler}
                                   onBlur={() => validation.emailCheck<ErrorType>(setErrors, errors, email)}
                                   value={email}
                                   className='textField' type='email' label={errors.email ? errors.email : 'Email'}
                                   variant="standard"/>
                        <p className='instructions'>
                            Enter your email address and we will send you further instructions
                        </p>
                    </div>
                    <Button onClick={sendInstruction} className='stretch'>Send Instructions</Button>
                    <div style={{textAlign: 'center'}}>
                        <p className='havingAnAccount'>Did you remember your password?</p>
                        <Link className='link' to='/'>Try logging in</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}