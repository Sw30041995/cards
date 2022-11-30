import React from 'react';
import avatar from '../../assets/icons/avatar.svg';
import photo from '../../assets/icons/photo.svg';
import logout from '../../assets/icons/logout.svg';
import arrow from '../../assets/icons/arrow.svg';
import {Button} from "../Button";
import {EditableSpan} from "./EditableSpan";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Navigate, useNavigate} from "react-router-dom";
import {logOut} from "../../reducers/authReducer";

export const Profile = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const email = useAppSelector(state => state.auth.userData.email)

    const logOutOfAccount = () => {
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
                    <div style={{position: 'relative'}}>
                        <img src={avatar} alt="Avatar"/>
                        <img title='Click to edit image'
                             style={{position: 'absolute', top: '65px', right: '0', cursor: 'pointer'}}
                             src={photo} alt="Avatar"/>
                    </div>
                    <EditableSpan/>
                    <p style={{marginTop: 0}} className='instructions'>{email}</p>
                    <Button onClick={logOutOfAccount} className='whiteButton'>
                        <img style={{position: 'relative', right: '10px', top: '2px'}} src={logout} alt="Log out"/>Log
                        out
                    </Button>
                    <div onClick={() => navigate('/pack')}
                         style={{position: 'absolute', left: '15%', top: '80px', cursor: 'pointer'}}>
                        <img style={{width: '20px', position: 'relative', top: '4px'}} src={arrow} alt="Arrow"/> Back to
                        Packs List
                    </div>
                </div>
            </div>
        </div>
    )
}

