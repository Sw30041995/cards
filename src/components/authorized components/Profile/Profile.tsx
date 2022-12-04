import React from 'react';
import photo from '../../../assets/icons/photo.svg';
import logout from '../../../assets/icons/logout.svg';
import {EditableSpan} from "../EditableSpan";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {Navigate} from "react-router-dom";
import {logOut} from "../../../reducers/authReducer";
import {Button} from '../../Button/Button';
import styles from './Profile.module.css';
import buttonStyles from '../../Button/Button.module.css';
import {BackArrow} from "../common/BackArrow/BackArrow";

export const Profile = () => {

    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)
    const email = useAppSelector(state => state.auth.userData.email)
    const avatar = useAppSelector(state => state.auth.userData.avatar)

    const logOutOfAccount = () => {
        dispatch(logOut())
    }

    if (!isLoggedIn) {
        return <Navigate to='/'/>
    }

    return (
        <div>
            <div className='container'>
                <BackArrow/>
                <div className={`login ${styles.profile}`}>
                    <h1 className={styles.title}>Personal Information</h1>
                    <div className='relative'>
                        <img className={styles.avatar} src={avatar ? avatar : 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png'} alt="Avatar"/>
                        <img className={styles.editAvatarIcon} title='Click to edit image' src={photo} alt="Edit"/>
                    </div>
                    <EditableSpan/>
                    <p className={styles.email}>{email}</p>
                    <Button onClick={logOutOfAccount} className={buttonStyles.logOutButton}>
                        <img className={buttonStyles.logOutIcon} src={logout} alt="Log out"/>Log out
                    </Button>
                </div>
            </div>
        </div>
    )
}

