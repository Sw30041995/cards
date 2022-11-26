import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Button} from "../Button";
import {Link, Navigate} from "react-router-dom";
import TextField from '@mui/material/TextField/TextField';
import {useAppDispatch, useAppSelector} from "../hooks";
import {login} from "../authReducer";

type LoginErrorsType = {
    email: string
    password: string
}

export const Login = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [rememberMe, setRememberMe] = useState(false)
    const [errors, setErrors] = useState<LoginErrorsType>({} as LoginErrorsType)

    const validation = {
        emailCheck() {
            if (!email) {
                setErrors({...errors, email: 'Required'})
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
                setErrors({...errors, email: 'Invalid email address'})
            }
        },
        passwordCheck() {
            if (!password) {
                setErrors({...errors, password: 'Required'})
            } else if (password.length < 8) {
                setErrors({...errors, password: 'Must be at least 8 characters'})
            }
        }
    }

    const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
        setErrors({...errors, email: ''})
    }
    const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
        setErrors({...errors, password: ''})
    }
    const checkboxChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setRememberMe(e.currentTarget.checked)
    }

    const sendLoginData = () => {
        dispatch(login({email, password, rememberMe}))
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!Object.values(errors).find(e => e)) {
            sendLoginData()
        }
    }

    if (isLoggedIn) {
        return <Navigate to='/profile'/>
    }

    return (
        <div className='login'>
            <h1 className='title'>Sign in</h1>
            <form onSubmit={handleSubmit}>
                <TextField error={!!errors.email} onBlur={validation.emailCheck} onChange={emailChangeHandler}
                           value={email}
                           className='textField' type='email' label={errors.email ? errors.email : 'Email'}
                           variant="standard"/>
                <TextField error={!!errors.password} onBlur={validation.passwordCheck} onChange={passwordChangeHandler}
                           value={password}
                           className='textField' type='password'
                           label={errors.password ? errors.password : 'Password'} variant="standard"/>
                <label>
                    <input onChange={checkboxChangeHandler} checked={rememberMe} className='checkbox'
                           type="checkbox"/>
                    <span className='rememberMe'>Remember me</span>
                </label>
                <Button type='submit' className='stretch'>Sign In</Button>
            </form>
            <Link className='reminder' to='/password-recovery-form'>Forgot Password?</Link>
            <p className='havingAnAccount'>Already have an account?</p>
            <Link className='link' to='/registration'>Sign Up</Link>
        </div>
    )
}