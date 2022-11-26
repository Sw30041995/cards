import TextField from '@mui/material/TextField/TextField';
import React from 'react';
import {Button} from "../Button";
import {Link} from "react-router-dom";

export const PasswordRecoveryForm = () => {
    return (
        <div className='login'>
            <h1 className='title'>Forgot your password?</h1>
            <div>
                <TextField className='textField' type='email' label="Email" variant="standard"/>
                <p className='instructions'>Enter your email address and we will send you further instructions</p>
            </div>
            <Button className='stretch'>Send Instructions</Button>
            <p className='havingAnAccount'>Did you remember your password?</p>
            <Link className='link' to='/'>Try logging in</Link>
        </div>
    )
}