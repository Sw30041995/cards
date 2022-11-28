import React from 'react';
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.svg";
import {Button} from "../../Button";
import {useAppSelector} from "../../hooks";
import {UserDataType} from "../../cardsAPI";
import s from "./Header.module.css";
import {Outlet, useNavigate} from 'react-router-dom';

export const Header = () => {

    const navigate = useNavigate()

    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const userData = useAppSelector<UserDataType>(state => state.auth.userData)

    return (
        <>
            <header className={s.headerBlock}>
                <img src={logo} alt="logo"/>
                {isLoggedIn ? (
                    <div className={s.personalData}>
                        <span className={s.name}>{userData.name}</span>
                        <img className={s.avatar} src={avatar} alt="Avatar"/>
                    </div>) : <Button onClick={() => navigate('/')}>Sign in</Button>}
            </header>
            <Outlet/>
        </>
    )
}