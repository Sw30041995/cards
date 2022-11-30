import React, {FC} from 'react';
import {CommonPropsType} from "./Title";

type PropsType = {
    textPosition?: boolean
}

export const ActionInstruction:FC<CommonPropsType & PropsType> = ({children, textPosition}) => {
    return (
        <p className={`instruction ${textPosition} ? centered-text : ''`}>{children}</p>
    )
}