import React from 'react';
import {Button} from "../Button";
import letter from '../assets/letter.svg';

export const PasswordRecoveryEmail = () => {
    return (
        <div className='login'>
            <h1 className='title'>Check Email</h1>
            <img src={letter} alt="Letter"/>
            <p className='instructions'>We’ve sent an Email with instructions to example@mail.com</p>
            <Button className='stretch'>Back to login</Button>
        </div>
    )
}