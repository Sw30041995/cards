import React, {CSSProperties, FC} from 'react';
import styles from './Button.module.css';

type PropsType = {
    children: React.ReactNode
    className?: string
    onClick?: () => void
    type?: 'submit' | 'reset' | 'button'
    style?: CSSProperties
}

export const Button: FC<PropsType> = (props) => {

    const {children, className, onClick, type, style} = props

    return (
        <button style={style} type={type} onClick={onClick} className={`${className} ${styles.button}`}>
            {children}
        </button>
    )
}