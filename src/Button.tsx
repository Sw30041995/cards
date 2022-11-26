import React from 'react';

type PropsType = {
    children: React.ReactNode
    className?: string
    onClick?: () => void
    type?: 'submit' | 'reset' | 'button'
}

export const Button = ({children, className, onClick, type}: PropsType) => {
    return (
        <button type={type} onClick={onClick} className={`button ${className}`}>{children}</button>
    )
}