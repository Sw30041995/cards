import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Button} from "../Button";
import {Link} from "react-router-dom";
import TextField from '@mui/material/TextField/TextField';
import {register} from "../authReducer";
import {useAppDispatch} from "../hooks";

type RegistrationErrorsType = {
    email: string
    password: string
    confirmPassword: string
    passwordsDoNotMatch: boolean
}

export const Registration = () => {

    const dispatch = useAppDispatch()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState<RegistrationErrorsType>({} as RegistrationErrorsType)

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
            } else if (password !== confirmPassword) {
                setErrors({...errors, passwordsDoNotMatch: true})
            }
        },
        confirmPasswordCheck() {
            if (!confirmPassword) {
                setErrors({...errors, confirmPassword: 'Required'})
            } else if (confirmPassword.length < 8) {
                setErrors({...errors, confirmPassword: 'Must be at least 8 characters'})
            } else if (password !== confirmPassword) {
                setErrors({...errors, passwordsDoNotMatch: true})
            }
        }
    }

    const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.currentTarget.value)
        setErrors({...errors, email: ''})
    }
    const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.currentTarget.value)
        setErrors({...errors, password: '', passwordsDoNotMatch: false})
    }
    const confirmPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(e.currentTarget.value)
        setErrors({...errors, confirmPassword: '', passwordsDoNotMatch: false})
    }

    const sendRegistrationData = () => {
        dispatch(register({email, password}))
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!Object.values(errors).find(e => e)) {
            sendRegistrationData()
        }
    }

    return (
        <div className='login'>
            <h1 className='title'>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <TextField onBlur={validation.emailCheck} error={!!errors.email} onChange={emailChangeHandler}
                           value={email}
                           className='textField'
                           type='text'
                           label={errors.email ? errors.email : 'Email'}
                           variant="standard"/>
                <TextField onBlur={validation.passwordCheck} error={!!errors.password} onChange={passwordChangeHandler}
                           value={password}
                           className='textField' type='password'
                           label={errors.password ? errors.password : 'Password'} variant="standard"/>
                <TextField onBlur={validation.confirmPasswordCheck} error={!!errors.confirmPassword}
                           onChange={confirmPasswordChangeHandler}
                           value={confirmPassword} className='textField'
                           type='password' label={errors.confirmPassword ? errors.confirmPassword : 'Confirm password'}
                           variant="standard"/>
                <span>{errors.passwordsDoNotMatch && 'Passwords do not match'}</span>
                <Button type='submit' className='stretch'>Sign Up</Button>
            </form>
            <p className='havingAnAccount'>Already have an account?</p>
            <Link className='link' to='/'>Sign In</Link>
        </div>
    )
}