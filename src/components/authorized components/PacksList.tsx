import React, {ChangeEvent, useEffect} from 'react';
import {PackTableHeader} from "./PackTableHeader";
import {PackTableBody} from "./PackTableBody";
import s from "./PackTableHeader.module.css";
import {Button} from "../Button";
import filter from "../../assets/icons/filter.svg";
import Pagination from "@mui/material/Pagination";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {createCardsPack, getMyPacks, getPacks} from "../../reducers/packReducer";
import {Navigate} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress/CircularProgress";

export const PacksList = () => {

    const dispatch = useAppDispatch()
    const cardPacks = useAppSelector(state => state.pack.cardPacks)
    const pageCount = useAppSelector(state => state.pack.pageCount)
    const cardPacksTotalCount = useAppSelector(state => state.pack.cardPacksTotalCount)
    const currentPage = useAppSelector(state => state.pack.page)
    const userId = useAppSelector(state => state.auth.userData._id)
    const isLoggedIn = useAppSelector(state => state.auth.isLoggedIn)

    const totalCountPages = Math.ceil(cardPacksTotalCount / pageCount)

    useEffect(() => {
        dispatch(getPacks(currentPage))
    }, [])

    const addNewCardsPack = () => {
        dispatch(createCardsPack({name: "new Pack", private: false}))
    }

    const showMyCardsPacks = () => {
        dispatch(getMyPacks(userId))
    }

    const showAllCardsPacks = () => {
        dispatch(getPacks(currentPage))
    }

    const handleChange = (event: ChangeEvent<unknown>, value: number) => {
        dispatch(getPacks(value))
    }

    if (!isLoggedIn) {
        return <Navigate to='/'/>
    }

    if (!cardPacks) {
        return <CircularProgress/>
    }

    return (
        <div>
            <div className={`container ${s.packContainer}`}>
                <div className={s.titleBlock}>
                    <h1>Packs List</h1>
                    <Button onClick={addNewCardsPack}>Add new pack</Button>
                </div>
                <div className={s.packSettings}>
                    <div>
                        <p>Search</p>
                        <input type="text"/>
                    </div>
                    <div>
                        <p>Show packs cards</p>
                        <Button onClick={showMyCardsPacks}>My</Button>
                        <Button onClick={showAllCardsPacks}>All</Button>
                    </div>
                    <div>
                        <p>Number of cards</p>
                        <input type="range"/>
                    </div>
                    <img style={{cursor: 'pointer'}} src={filter} alt="Filter"/>
                </div>

                <table className={s.table}>
                    <PackTableHeader/>
                    <tbody className={s.tableBody}>
                    {cardPacks &&
                    cardPacks.map(p => <PackTableBody key={p._id} name={p.name}
                                                      cardsCount={p.cardsCount}
                                                      updated={p.updated}
                                                      user_name={p.user_name}/>)}
                    </tbody>
                </table>
                <div className={s.pagination}>
                    <Pagination page={currentPage} count={totalCountPages} onChange={handleChange} shape="rounded"
                                color="primary" size='small'/>
                </div>
            </div>
        </div>
    )
}