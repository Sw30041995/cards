import React, {FC} from 'react';
import {Button} from "../Button/Button";

type PropsType = {
    addNewCard: () => void
}

export const EmptyPack:FC<PropsType> = ({addNewCard}) => {
    return (
        <div style={{textAlign: 'center'}}>
            <p style={{color: 'rgba(0, 0, 0, 0.5)', marginBottom: '35px'}}>
                This pack is empty. Click add new card to fill this pack
            </p>
            <Button onClick={addNewCard}>Add new card</Button>
        </div>
    )
}