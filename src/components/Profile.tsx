import React from 'react';
import avatar from '../assets/avatar.svg';
import photo from '../assets/photo.svg';
import logout from '../assets/logout.svg';
import {Button} from "../Button";
import {EditableSpan} from "../EditableSpan";
import {useAppDispatch, useAppSelector} from "../hooks";
import {Navigate} from "react-router-dom";
import {logOut} from "../authReducer";
import {UserDataType} from "../cardsAPI";

export const Profile = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const userData = useAppSelector<UserDataType>(state => state.auth.userData)

    const LogOutOfAccount = () => {
        dispatch(logOut())
    }

    if (!isLoggedIn) {
        return <Navigate to='/'/>
    }

    return (
        <div>
            <div className='container'>
                <div className={`login profile`}>
                    <h1 className='title'>Personal Information</h1>
                    <div>
                        <img src={avatar} alt="Avatar"/>
                        <img style={{position: 'relative', right: '30px'}} src={photo} alt="Avatar"/>
                    </div>
                    <EditableSpan/>
                    <p style={{marginTop: 0}} className='instructions'>{userData.email}</p>
                    <Button onClick={LogOutOfAccount} className='whiteButton'>
                        <img style={{position: 'relative', right: '10px', top: '2px'}} src={logout} alt="Log out"/>Log
                        out
                    </Button>
                    {/*<div style={{position: 'absolute', left: '15%', top: '80px'}}><img src={arrow} alt="Arrow"/><span>Back to Packs List</span></div>*/}
                </div>
            </div>
        </div>
    )
}