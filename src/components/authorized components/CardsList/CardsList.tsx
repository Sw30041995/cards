import React, {useEffect, useState} from 'react';
import {CardsTableBody} from "../CardsTableBody";
import {CardsTableHeader} from "../CardsTableHeader";
import styles from "./CardsList.module.css";
import packsListStyles from "../PacksList/PacksList.module.css";
import edit from "../../../assets/icons/edit.svg";
import deleteIcon from "../../../assets/icons/delete.svg";
import teacher from "../../../assets/icons/teacher.svg";
import {useLocation} from 'react-router-dom';
import Pagination from "@mui/material/Pagination";
import TextField from "@mui/material/TextField/TextField";
import {Button} from "../../Button/Button";
import menu from '../../../assets/icons/menu.svg'
import {useAppDispatch, useAppSelector} from "../../../hooks";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import {EmptyPack} from "../EmptyPack";
import {createNewCard, getCards} from "../../../reducers/cardReducer";
import {BackArrow} from "../common/BackArrow/BackArrow";
import profileStyles from "../Profile/Profile.module.css";

export const CardsList = () => {

    const dispatch = useAppDispatch()
    const {state} = useLocation()
    const cards = useAppSelector(state => state.card.cards)
    const pageCount = useAppSelector(state => state.card.pageCount)
    const cardsTotalCount = useAppSelector(state => state.card.cardsTotalCount)

    const [packMenuShown, setPackMenuShown] = useState(false)

    const totalCountPages = Math.ceil(cardsTotalCount / pageCount)

    useEffect(() => {
        dispatch(getCards(state.packId, 1))
    }, [])

    const addNewCard = () => {
        dispatch(createNewCard({cardsPack_id: state.packId, answer: '4', question: '2 + 2'}))
    }

    if (!cards) {
        return <CircularProgress/>
    }

    return (
        <div>
            <div className='container'>
                <div className={styles.cardsListBlock}>
                    <BackArrow/>
                    <div className={packsListStyles.titleBlock}>
                        <div className='relative'>
                            <h1 className={profileStyles.title}>
                                {state.name}
                                {state.isOwner &&
                                <img className={styles.packMenuIcon} onClick={() => setPackMenuShown(!packMenuShown)}
                                     src={menu} alt="Menu"/>}
                            </h1>
                            {packMenuShown &&
                            <div className={styles.packMenu}>
                                <p className='pointer'><img src={edit} alt="Edit"/>Edit</p>
                                <p className='pointer'><img src={deleteIcon} alt="Logout"/>Delete</p>
                                <p className='pointer'><img src={teacher} alt="Learn"/>Learn</p>
                            </div>}
                        </div>
                        {!!cards.length && (state.isOwner ? <Button onClick={addNewCard}>Add new card</Button> :
                            <Button>Learn to pack</Button>)}
                    </div>
                    {cards.length ? <>
                        <label style={{width: '100%'}}>
                            <span style={{display: 'inline-block'}}>Search</span>
                            <TextField placeholder='Provide your text' style={{width: '100%'}} type='text'
                                       size='small'/>
                        </label>
                        <div className={packsListStyles.tableBlock}>
                            <table className={packsListStyles.table}>
                                <CardsTableHeader isOwner={state.isOwner}/>
                                <tbody className={packsListStyles.tableBody}>
                                {cards.map(c => <CardsTableBody key={c._id} cardId={c._id} isOwner={state.isOwner}
                                                                question={c.question}
                                                                answer={c.answer}
                                                                updated={c.updated} grade={c.grade}/>)}
                                </tbody>
                            </table>
                        </div>
                    </> : <EmptyPack addNewCard={addNewCard}/>}
                    {totalCountPages > 1 && <div className={packsListStyles.pagination}>
                        <Pagination shape="rounded" color="primary" size='small'/>
                    </div>}
                </div>
            </div>
        </div>
    )
}