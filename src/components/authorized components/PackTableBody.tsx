import React, {FC} from 'react';
import s from './PackTableHeader.module.css';
import teacher from "../../assets/icons/teacher.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import edit from "../../assets/icons/edit.svg";
import {CardPackType} from "../../api/cardsAPI";

type PropsType = Pick<CardPackType, 'name' | 'cardsCount' |'updated' | 'user_name'>

export const PackTableBody: FC<PropsType> = (props) => {

    const {name, cardsCount, updated, user_name} = props

    return (
        <tr className={s.bodyCell}>
            <td className={s.cell}>{name}</td>
            <td className={s.cell}>{cardsCount}</td>
            <td className={s.cell}>{updated.slice(0, 10)}</td>
            <td className={s.cell}>{user_name}</td>
            <td className={s.cell}>
                <img style={{cursor: 'pointer'}} src={teacher} alt="Learn"/>
                <img style={{cursor: 'pointer', margin: '0 15px'}} src={edit} alt="Learn"/>
                <img style={{cursor: 'pointer'}} src={deleteIcon} alt="Learn"/>
            </td>
        </tr>
    )
}