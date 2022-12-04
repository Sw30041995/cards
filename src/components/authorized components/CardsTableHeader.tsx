import React, {FC} from 'react';
import s from './PacksTableHeader.module.css';

type PropsType = {
    isOwner: boolean
}

export const CardsTableHeader:FC<PropsType> = ({isOwner}) => {
    return (
        <thead className={s.tableHead}>
        <tr className={s.headerCell}>
            <th className={s.cell}>Question</th>
            <th className={s.cell}>Answer</th>
            <th className={s.cell}>Last Updated</th>
            <th className={s.cell}>Grade</th>
            {isOwner && <th className={s.cell}/>}
        </tr>
        </thead>
    )
}
