import React, {useState} from 'react';
import logo from "../../assets/icons/logo.svg";
import avatar from "../../assets/icons/avatar.svg";
import {Button} from "../Button";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {UserDataType} from "../../api/cardsAPI";
import s from "./Header.module.css";
import {Outlet, useNavigate} from 'react-router-dom';
import user from '../../assets/icons/user.svg';
import logout from '../../assets/icons/logout.svg';
import {logOut} from "../../reducers/authReducer";

export const Header = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const userData = useAppSelector<UserDataType>(state => state.auth.userData)
    const [profileMenuShow, setProfileMenuShow] = useState(false)

    const LogOutOfAccount = () => {
        dispatch(logOut())
    }

    return (
        <>
            <header className={s.headerBlock}>
                <img src={logo} alt="logo"/>
                {isLoggedIn ? (
                    <div onMouseOver={() => setProfileMenuShow(true)} className={s.personalData}>
                        <span className={s.name}>{userData.name}</span>
                        <img className={s.avatar} src={avatar} alt="Avatar"/>
                        {profileMenuShow && <div onMouseOut={() => setProfileMenuShow(false)} className={s.profileMenu}>
                            <p onClick={() => navigate('/profile')} style={{cursor: 'pointer'}}><img src={user} alt="User"/>Profile</p>
                            <p onClick={LogOutOfAccount} style={{cursor: 'pointer'}}><img src={logout} alt="Logout"/>Log out</p>
                        </div>}
                    </div>) : <Button onClick={() => navigate('/')}>Sign in</Button>}
            </header>
            <Outlet/>
        </>
    )
}