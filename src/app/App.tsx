import React, {useEffect} from 'react';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import {Login} from "../components/Login";
import {Registration} from "../components/Registration";
import {PasswordRecovery} from "../components/PasswordRecovery";
import {PasswordUpdate} from "../components/PasswordUpdate";
import {Profile} from "../components/Profile";
import {useAppDispatch, useAppSelector} from "../hooks";
import {checkAuth} from "../authReducer";
import CircularProgress from '@mui/material/CircularProgress/CircularProgress';
import {Header} from "../components/Header/Header";
import {NotFoundPage} from "../components/NotFoundPage/NotFoundPage";
import {ErrorMessage} from "../ErrorMessage";
import {SendingLetter} from "../components/SendingLetter";

function App() {

    const dispatch = useAppDispatch()
    const isInitialized = useAppSelector<boolean>(state => state.auth.isInitialized)

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
                    <Route path='/' element={<Login/>}/>
                    <Route path='registration' element={<Registration/>}/>
                    <Route path='password-recovery' element={<PasswordRecovery/>}/>
                    <Route path='password-update/:token' element={<PasswordUpdate/>}/>
                    <Route path='password-recovery/sending-letter' element={<SendingLetter/>}/>
                    <Route path='profile' element={<Profile/>}/>
                    <Route path='404' element={<NotFoundPage/>}/>
                </Route>
            </Routes>
            <ErrorMessage/>
        </div>
    )
}

export default App
