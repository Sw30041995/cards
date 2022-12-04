import React, {useEffect} from 'react';
import './App.css';
import {Navigate, Route, Routes} from 'react-router-dom';
import {Login} from "../components/unauthorized components/Login";
import {Registration} from "../components/unauthorized components/Registration";
import {PasswordRecovery} from "../components/unauthorized components/PasswordRecovery";
import {PasswordUpdate} from "../components/unauthorized components/PasswordUpdate";
import {Profile} from "../components/authorized components/Profile/Profile";
import {useAppDispatch, useAppSelector} from "../hooks";
import {checkAuth} from "../reducers/authReducer";
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import {Header} from "../components/Header/Header";
import {NotFoundPage} from "../components/NotFoundPage/NotFoundPage";
import {ErrorMessage} from "../components/ErrorMessage";
import {SendingLetter} from "../components/unauthorized components/SendingLetter";
import {PacksList} from "../components/authorized components/PacksList/PacksList";
import {CardsList} from "../components/authorized components/CardsList/CardsList";

function App() {

    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector(state => state.auth.isInitialized)

    useEffect(() => {
        dispatch(checkAuth())
    }, [])

    if (!isInitialized) {
        return <CircularProgress/>
    }

    return (
        <div className="App">
            <Routes>
                <Route path='/' element={<Header/>}>
                    <Route index element={<Login/>}/>
                    <Route path='registration' element={<Registration/>}/>
                    <Route path='password-recovery' element={<PasswordRecovery/>}/>
                    <Route path='password-update/:token' element={<PasswordUpdate/>}/>
                    <Route path='password-recovery/sending-letter' element={<SendingLetter/>}/>
                    <Route path='profile' element={<Profile/>}/>
                    <Route path='404' element={<NotFoundPage/>}/>
                    <Route path='*' element={<Navigate to='404'/>}/>
                    <Route path='pack' element={<PacksList/>}/>
                    <Route path='card' element={<CardsList/>}/>
                </Route>
            </Routes>
            <ErrorMessage/>
        </div>
    )
}

export default App
