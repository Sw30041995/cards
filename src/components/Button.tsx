import React, {CSSProperties} from 'react';

type PropsType = {
    children: React.ReactNode
    className?: string
    onClick?: () => void
    type?: 'submit' | 'reset' | 'button'
    style?: CSSProperties
}

export const Button = ({children, className, onClick, type, style}: PropsType) => {
    return (
        <button style={style} type={type} onClick={onClick} className={`button ${className}`}>{children}</button>
    )
}