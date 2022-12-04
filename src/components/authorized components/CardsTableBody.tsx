import Rating from '@mui/material/Rating/Rating';
import React, {FC} from 'react';
import s from "./PacksTableHeader.module.css";
import edit from "../../assets/icons/edit.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import {useAppDispatch} from "../../hooks";
import {deleteCard, updateCardData} from "../../reducers/cardReducer";

type PropsType = {
    isOwner: boolean
    question: string
    answer: string
    updated: string
    grade: number
    cardId: string
}

export const CardsTableBody: FC<PropsType> = (props) => {

    const {isOwner, answer, grade, question, updated, cardId} = props

    const dispatch = useAppDispatch()

    const removeCard = () => {
        dispatch(deleteCard(cardId))
    }

    const changeCardInfo = () => {
        dispatch(updateCardData({_id: cardId, answer: 'new answer', question: 'new question'}))
    }

    return (
        <tr className={s.bodyCell}>
            <td className={s.cell}>{question}</td>
            <td className={s.cell}>{answer}</td>
            <td className={s.cell}>{updated.slice(0, 10)}</td>
            <td className={s.cell}><Rating defaultValue={grade}/></td>
            {isOwner && <td className={s.cell}>
                <img className='pointer' src={edit} alt='Edit' onClick={changeCardInfo}/>
                <img className='pointer' onClick={removeCard} src={deleteIcon} alt='Delete'/>
            </td>}
        </tr>
    )
}

