import React, {useState} from 'react';
import logo from "../../assets/icons/logo.svg";
import {Button} from "../Button/Button";
import {useAppDispatch, useAppSelector} from "../../hooks";
import styles from "./Header.module.css";
import {Outlet, useNavigate} from 'react-router-dom';
import user from '../../assets/icons/user.svg';
import logout from '../../assets/icons/logout.svg';
import {logOut} from "../../reducers/authReducer";

export const Header = () => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const userName = useAppSelector(state => state.auth.userData.name)
    const avatar = useAppSelector(state => state.auth.userData.avatar)
    const [show, setShow] = useState(false)

    const toggleProfileMenu = () => {
        setShow(!show)
    }

    const LogOutOfAccount = () => {
        dispatch(logOut())
    }

    return (
        <>
            <header className={styles.headerBlock}>
                <img src={logo} alt="logo"/>
                {isLoggedIn ? (
                    <div onClick={toggleProfileMenu} className={styles.personalData}>
                        <span className={styles.name}>{userName}</span>
                        <img className={styles.avatar}
                             src={avatar ? avatar : 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png'}
                             alt="Avatar"/>
                        {show && <div className={styles.profileMenu}>
                            <p onClick={() => navigate('/profile')} className='pointer'>
                                <img className={styles.icon} src={user} alt="User"/>
                                Profile
                            </p>
                            <p onClick={LogOutOfAccount} className='pointer'>
                                <img className={styles.icon} src={logout} alt="Logout"/>
                                Log out
                            </p>
                        </div>}
                    </div>) : <Button onClick={() => navigate('/')}>Sign in</Button>}
            </header>
            <Outlet/>
        </>
    )
}