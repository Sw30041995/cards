import React from 'react';
import {Button} from "../../Button";
import error from '../../assets/error.svg'
import s from './NotFoundPage.module.css'
import {Link} from 'react-router-dom';

export const NotFoundPage = () => {
    return (
        <div className={s.notFoundPageBlock}>
            <div className='container'>
                <div className={s.notFoundPage}>
                    <div className={s.errorInformation}>
                        <h1 className={s.title}>Ooops!</h1>
                        <p className={s.error}>Sorry! Page not found!</p>
                        <Link to='/'><Button>Back to home page</Button></Link>
                    </div>
                    <img src={error} alt="Error 404"/>
                </div>
            </div>
        </div>
    )
}