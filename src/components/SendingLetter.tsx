import React from 'react';
import {Button} from "../Button";
import letter from '../assets/letter.svg';
import {useLocation, useNavigate} from "react-router-dom";

export const SendingLetter = () => {

    const navigate = useNavigate()
    const location = useLocation()

    return (
        <div>
            <div className='container'>
                <div className='login passwordRecoveryEmail'>
                    <h1 className='title'>Check Email</h1>
                    <img src={letter} alt="Letter"/>
                    <p className='instructions' style={{textAlign: 'center'}}>
                        We’ve sent an Email with instructions to {location.state.email}
                    </p>
                    <Button onClick={() => navigate('/')} className='stretch'>Back to login</Button>
                </div>
            </div>
        </div>
    )
}