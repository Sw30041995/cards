import React, {ChangeEvent, useEffect} from 'react';
import {PacksTableHeader} from "../PacksTableHeader";
import {PacksTableBody} from "../PacksTableBody";
import styles from "./PacksList.module.css";
import profileStyles from "../Profile/Profile.module.css";
import buttonStyles from "../../Button/Button.module.css";
import filter from '../../../assets/icons/filter.svg'
import {Button} from "../../Button/Button";
import Pagination from "@mui/material/Pagination";
import {useAppDispatch, useAppSelector} from "../../../hooks";
import {createCardsPack, getAllPacks, getMyPacks} from "../../../reducers/packReducer";
import {Navigate} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";
import TextField from '@mui/material/TextField/TextField';

export const PacksList = () => {

    const dispatch = useAppDispatch()
    const myUserId = useAppSelector(state => state.auth.userData._id)
    const cardPacks = useAppSelector(state => state.pack.cardPacks)
    const pageCount = useAppSelector(state => state.pack.pageCount)
    const cardPacksTotalCount = useAppSelector(state => state.pack.cardPacksTotalCount)
    const currentPage = useAppSelector(state => state.pack.page)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const totalCountPages = Math.ceil(cardPacksTotalCount / pageCount)

    useEffect(() => {
        dispatch(getAllPacks(1))
    }, [])

    const addNewPack = () => {
        dispatch(createCardsPack({name: "Pack", deckCover: '', private: false}))
    }

    const showMyPacksList = () => {
        dispatch(getMyPacks(myUserId, 1))
    }

    const showAllPacksList = () => {
        dispatch(getAllPacks(1))
    }

    const handleChange = (event: ChangeEvent<unknown>, value: number) => {
        dispatch(getAllPacks(value))
    }

    if (!isLoggedIn) {
        return <Navigate to='/'/>
    }

    if (!cardPacks) {
        return <CircularProgress/>
    }

    return (
        <div>
            <div className='container'>
                <div className={styles.packsListBlock}>
                    <div className={styles.titleBlock}>
                        <h1 className={profileStyles.title}>Packs List</h1>
                        <Button onClick={addNewPack}>Add new pack</Button>
                    </div>
                    <div className={styles.packSettings}>
                        <div>
                            <label>
                                <span style={{display: 'block'}}>Search</span>
                                <TextField size='small' placeholder='Provide your text'/>
                            </label>
                        </div>
                        <div>
                            <p>Show packs cards</p>
                            <Button className={buttonStyles.filterButton} onClick={showMyPacksList}>My</Button>
                            <Button className={buttonStyles.filterButton} onClick={showAllPacksList}>All</Button>
                        </div>
                        <div>
                            <p>Number of cards</p>
                            <input type="range"/>
                        </div>
                        <img className='pointer' src={filter} alt="Filter"/>
                    </div>
                    <div className={styles.tableBlock}>
                        <table className={styles.table}>
                            <PacksTableHeader/>
                            <tbody className={styles.tableBody}>
                            {cardPacks &&
                            cardPacks.map(p => <PacksTableBody
                                key={p._id} userId={p.user_id} packId={p._id} name={p.name}
                                cardsCount={p.cardsCount} updated={p.updated} userName={p.user_name}/>)}
                            </tbody>
                        </table>
                    </div>
                    <div className={styles.pagination}>
                        {totalCountPages > 1 &&
                        <Pagination page={currentPage} count={totalCountPages} onChange={handleChange} shape="rounded"
                                    color="primary" size='small'/>}
                    </div>
                </div>
            </div>
        </div>
    )
}