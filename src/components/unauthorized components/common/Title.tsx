import React, {FC, ReactNode} from 'react';

export type CommonPropsType = {
    children: ReactNode
}

export const Title: FC<CommonPropsType> = ({children}) => {
    return (
        <h1 className='title'>{children}</h1>
    )
}