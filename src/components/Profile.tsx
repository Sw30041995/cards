import React from 'react';
import avatar from '../assets/avatar.svg';
import photo from '../assets/photo.svg';
import logout from '../assets/logout.svg';
import arrow from '../assets/arrow.svg';
import {Button} from "../Button";
import {EditableSpan} from "../EditableSpan";
import {useAppSelector} from "../hooks";
import {Navigate} from "react-router-dom";

export const Profile = () => {

    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)

    if (!isLoggedIn) {
        return <Navigate to='/'/>
    }

    return (
        <div>
            <div style={{position: 'absolute', left: '15%', top: '80px'}}><img src={arrow} alt="Arrow"/><span>Back to Packs List</span></div>
            <div className='login'>
                <h1 className='title'>Personal Information</h1>
                <div>
                    <img src={avatar} alt="Avatar"/>
                    <img style={{position: 'relative', right: '30px'}} src={photo} alt="Avatar"/>
                </div>
                <EditableSpan/>
                <p className='instructions'>j&johnson@gmail.com</p>
                <Button className='whiteButton'>
                    <img style={{position: 'relative', right: '10px', top: '2px'}} src={logout} alt="Log out"/>Log out
                </Button>
            </div>
        </div>
    )
}