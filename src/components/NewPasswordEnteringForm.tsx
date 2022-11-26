import TextField from '@mui/material/TextField/TextField';
import React from 'react';
import {Button} from "../Button";

export const NewPasswordEnteringForm = () => {
    return (
        <div className='login'>
            <h1 className='title'>Create new password</h1>
            <div>
                <TextField className='textField' type='password' label="Password" variant="standard"/>
                <p className='instructions'>Create new password and we will send you further instructions to email</p>
            </div>
            <Button className='stretch'>Create new password</Button>
        </div>
    )
}