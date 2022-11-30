import React from 'react';
import {Button} from "../Button";
import letter from '../../assets/icons/letter.svg';
import {useLocation, useNavigate} from "react-router-dom";
import {Title} from "./common/Title";
import {ActionInstruction} from "./common/ActionInstruction";

export const SendingLetter = () => {

    const navigate = useNavigate()
    const location = useLocation()

    return (
        <div>
            <div className='container'>
                <div className='login passwordRecoveryEmail'>
                    <Title>Check Email</Title>
                    <img src={letter} alt="Letter"/>
                        <ActionInstruction textPosition>
                            We’ve sent an Email with instructions to {location.state.email}
                        </ActionInstruction>
                    <Button onClick={() => navigate('/')} className='stretch'>Back to login</Button>
                </div>
            </div>
        </div>
    )
}