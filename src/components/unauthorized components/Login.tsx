import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Button} from "../Button";
import {Link, Navigate} from "react-router-dom";
import TextField from '@mui/material/TextField/TextField';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {login} from "../../reducers/authReducer";
import {validation} from "../../validation";
import {LoginDataType} from "../../api/cardsAPI";
import eyeHide from "../../assets/icons/eye-hide.svg";
import eyeShow from "../../assets/icons/eye-show.svg";
import {Title} from "./common/Title";
import {ClarifyingQuestion} from "./common/ClarifyingQuestion";

type LoginErrorsType = {
    email: string
    password: string
}

export const Login = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const [loginData, setLoginData] = useState<LoginDataType>({email: '', password: '', rememberMe: false})
    const [errors, setErrors] = useState<LoginErrorsType>({} as LoginErrorsType)
    const [passwordHidden, setPasswordHidden] = useState(true)

    const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginData({...loginData, email: e.currentTarget.value})
        setErrors({...errors, email: ''})
    }
    const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginData({...loginData, password: e.currentTarget.value})
        setErrors({...errors, password: ''})
    }
    const checkboxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginData({...loginData, rememberMe: e.currentTarget.checked})
    }

    const sendLoginData = () => {
        dispatch(login(loginData))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!loginData.email && !loginData.password) {
            setErrors({...errors, email: 'Required', password: 'Required'})
            return
        } else if (!loginData.password) {
            setErrors({...errors, password: 'Required'})
            return
        } else if (!loginData.email) {
            setErrors({...errors, email: 'Required'})
            return
        } else if (!!Object.values(errors).find(el => el)) {
            return
        }
        sendLoginData()
    }

    if (isLoggedIn) {
        return <Navigate to={`/pack`}/>
    }

    return (
        <div>
            <div className='container'>
                <div className='login'>
                    <Title>Sign in</Title>
                    <form style={{width: '100%'}} onSubmit={handleSubmit}>
                        <TextField error={!!errors.email}
                                   onBlur={() => validation.emailCheck(setErrors, errors, loginData.email)}
                                   onChange={emailChangeHandler}
                                   value={loginData.email}
                                   className='textField' type='text' label={errors.email ? errors.email : 'Email'}
                                   variant="standard"/>
                        <div style={{position: 'relative'}}>
                            <TextField error={!!errors.password}
                                       onBlur={() => validation.passwordCheck(setErrors, errors, loginData.password)}
                                       onChange={passwordChangeHandler}
                                       value={loginData.password}
                                       className='textField' type={passwordHidden ? 'password' : 'text'}
                                       label={errors.password ? errors.password : 'Password'} variant="standard"/>
                            <img onClick={() => setPasswordHidden(!passwordHidden)}
                                 style={{position: 'absolute', top: '20px', right: '10px', cursor: 'pointer'}}
                                 src={passwordHidden ? eyeShow : eyeHide}
                                 alt="Eye"/>
                        </div>
                        <label className='checkboxLabel'>
                            <input onChange={checkboxChangeHandler} checked={loginData.rememberMe} className='checkbox'
                                   type="checkbox"/>
                            <span className='rememberMe'>Remember me</span>
                        </label>
                        <Link className='reminder' to='/password-recovery'>Forgot Password?</Link>
                        <Button type='submit' className='stretch'>Sign In</Button>
                    </form>
                    <div style={{textAlign: 'center'}}>
                        <ClarifyingQuestion>Already have an account?</ClarifyingQuestion>
                        <Link className='link' to='/registration'>Sign Up</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}