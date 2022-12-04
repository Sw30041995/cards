import React, {ChangeEvent, FormEvent, useState} from 'react';
import {Button} from "../Button/Button";
import {Link, Navigate} from "react-router-dom";
import TextField from '@mui/material/TextField/TextField';
import {register} from "../../reducers/authReducer";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {validation} from "../../validation";
import eyeHide from "../../assets/icons/eye-hide.svg";
import eyeShow from "../../assets/icons/eye-show.svg";
import {Title} from "./common/Title";
import {ClarifyingQuestion} from "./common/ClarifyingQuestion";

type RegistrationErrorsType = RegistrationDataType

type RegistrationDataType = {
    email: string
    password: string
    confirmPassword: string
}

export const Registration = () => {

    const dispatch = useAppDispatch()
    const registrationSuccessful = useAppSelector(state => state.auth.registrationSuccessful)

    const [registrationData, setRegistrationData] = useState<RegistrationDataType>({
        email: '',
        password: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState<RegistrationErrorsType>({} as RegistrationErrorsType)
    const [passwordHidden, setPasswordHidden] = useState(true)
    const [confirmPasswordHidden, setConfirmPasswordHidden] = useState(true)

    const emailChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setRegistrationData({...registrationData, email: e.currentTarget.value})
        setErrors({...errors, email: ''})
    }
    const passwordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setRegistrationData({...registrationData, password: e.currentTarget.value})
        if (errors.password === 'Passwords do not match') {
            setErrors({...errors, password: '', confirmPassword: ''})
        } else {
            setErrors({...errors, password: ''})
        }
    }
    const confirmPasswordChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setRegistrationData({...registrationData, confirmPassword: e.currentTarget.value})
        if (errors.password === 'Passwords do not match') {
            setErrors({...errors, password: '', confirmPassword: ''})
        } else {
            setErrors({...errors, confirmPassword: ''})
        }
    }

    const {email, password, confirmPassword} = registrationData

    const sendRegistrationData = () => {
        dispatch(register({email, password}))
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!registrationData.email && !registrationData.password && !registrationData.confirmPassword) {
            setErrors({...errors, email: 'Required', password: 'Required', confirmPassword: 'Required'})
            return
        } else if (registrationData.email && !registrationData.password && !registrationData.confirmPassword) {
            setErrors({...errors, password: 'Required', confirmPassword: 'Required'})
            return
        } else if (!registrationData.email && registrationData.password && !registrationData.confirmPassword) {
            setErrors({...errors, email: 'Required', confirmPassword: 'Required'})
            return
        } else if (!registrationData.email && !registrationData.password && registrationData.confirmPassword) {
            setErrors({...errors, email: 'Required', password: 'Required'})
            return
        } else if (!registrationData.email) {
            setErrors({...errors, email: 'Required'})
            return
        } else if (!registrationData.password) {
            setErrors({...errors, password: 'Required'})
            return
        } else if (!registrationData.confirmPassword) {
            setErrors({...errors, confirmPassword: 'Required'})
            return
        } else if (registrationData.confirmPassword !== registrationData.password) {
            setErrors({...errors, password: 'Passwords do not match', confirmPassword: 'Passwords do not match'})
            return
        }
        if (!!Object.values(errors).find(e => e)) {
            return
        }
        sendRegistrationData()
    }

    if (registrationSuccessful) {
        return <Navigate to='/'/>
    }

    return (
        <div>
            <div className='container'>
                <div className='login'>
                    <Title>Sign Up</Title>
                    <form style={{width: '100%'}} onSubmit={handleSubmit}>
                        <TextField
                            onBlur={() => validation.emailCheck<RegistrationErrorsType>(setErrors, errors, email)}
                            error={!!errors.email}
                            onChange={emailChangeHandler}
                            value={registrationData.email}
                            className='textField'
                            type='text'
                            label={errors.email ? errors.email : 'Email'}
                            variant="standard"/>
                        <div style={{position: 'relative'}}>
                            <TextField
                                onBlur={() => validation.passwordCheck<RegistrationErrorsType>(setErrors, errors, password)}
                                error={!!errors.password}
                                onChange={passwordChangeHandler}
                                value={password}
                                className='textField' type={passwordHidden ? 'password' : 'text'}
                                label={errors.password ? errors.password : 'Password'} variant="standard"/>
                            <img onClick={() => setPasswordHidden(!passwordHidden)}
                                 style={{position: 'absolute', top: '20px', right: '10px', cursor: 'pointer'}}
                                 src={passwordHidden ? eyeShow : eyeHide}
                                 alt="eye"/>
                        </div>
                        <div style={{position: 'relative'}}>
                            <TextField
                                onBlur={() => validation.confirmPasswordCheck<RegistrationErrorsType>(setErrors, errors, confirmPassword)}
                                error={!!errors.confirmPassword}
                                onChange={confirmPasswordChangeHandler}
                                value={confirmPassword} className='textField'
                                type={confirmPasswordHidden ? 'password' : 'text'}
                                label={errors.confirmPassword ? errors.confirmPassword : 'Confirm password'}
                                variant="standard"/>
                            <img onClick={() => setConfirmPasswordHidden(!confirmPasswordHidden)}
                                 style={{position: 'absolute', top: '20px', right: '10px', cursor: 'pointer'}}
                                 src={confirmPasswordHidden ? eyeShow : eyeHide}
                                 alt="eye"/>
                        </div>
                        <Button style={{marginTop: '115px'}} type='submit' className='stretch'>Sign Up</Button>
                    </form>
                    <div style={{textAlign: 'center'}}>
                        <ClarifyingQuestion>Already have an account?</ClarifyingQuestion>
                        <Link className='link' to='/'>Sign In</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
