import React from 'react';
import arrow from "../../../../assets/icons/arrow.svg";
import {useNavigate} from "react-router-dom";
import styles from './BackArrow.module.css'

export const BackArrow = () => {

    const navigate = useNavigate()

    return (
        <div className={styles.backArrowBlock} onClick={() => navigate('/pack')}>
            <img className={styles.arrowIcon} src={arrow} alt="Arrow"/>
            <span>Back to Packs List</span>
        </div>
    )
}