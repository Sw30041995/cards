import React, {FC} from 'react';
import {CommonPropsType} from "./Title";

export const ClarifyingQuestion: FC<CommonPropsType> = ({children}) => {
    return (
        <p className='havingAnAccount'>{children}</p>
    )
}