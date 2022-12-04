import React, {FC} from 'react';
import s from './PacksTableHeader.module.css';
import teacher from "../../assets/icons/teacher.svg";
import deleteIcon from "../../assets/icons/delete.svg";
import edit from "../../assets/icons/edit.svg";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {useNavigate} from 'react-router-dom';
import {deleteCardsPack, updateCardsPackTitle} from "../../reducers/packReducer";

type PropsType = {
    userId: string
    packId: string
    name: string
    cardsCount: number
    updated: string
    userName: string
}

export const PacksTableBody: FC<PropsType> = (props) => {

    const {userId, packId, name, cardsCount, updated, userName} = props

    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const myUserId = useAppSelector(state => state.auth.userData._id)
    const isOwner = userId === myUserId

    const setCards = () => {
        navigate('/card', {state: {isOwner, name, packId}})
    }

    const changePackTitle = () => {
        dispatch(updateCardsPackTitle({_id: packId, name: 'NEW TITLE'}))
    }

    const deletePack = () => {
        dispatch(deleteCardsPack(packId))
    }

    return (
        <tr className={s.bodyCell}>
            <td className={s.cell}>{name}</td>
            <td className={s.cell}>{cardsCount}</td>
            <td className={s.cell}>{updated.slice(0, 10)}</td>
            <td className={s.cell}>{userName}</td>
            <td className={s.cell}>
                <img title='Learn' onClick={setCards} style={{cursor: 'pointer'}} src={teacher} alt="Learn"/>
                {isOwner && <img title='Edit' onClick={changePackTitle} style={{cursor: 'pointer', margin: '0 15px'}} src={edit} alt="Learn"/>}
                {isOwner && <img title='Delete' onClick={deletePack} style={{cursor: 'pointer'}} src={deleteIcon} alt="Learn"/>}
            </td>
        </tr>
    )
}