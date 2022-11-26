import React from 'react';
import logo from '../assets/logo.svg';
import avatar from '../assets/avatar.svg';
import './App.css';
import {Route, Routes} from 'react-router-dom';
import {Login} from "../components/Login";
import {Registration} from "../components/Registration";
import {PasswordRecoveryForm} from "../components/PasswordRecoveryForm";
import {PasswordRecoveryEmail} from "../components/PasswordRecoveryEmail";
import {NewPasswordEnteringForm} from "../components/NewPasswordEnteringForm";
import {Profile} from "../components/Profile";


function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} alt="logo"/>
                {/*<Button>Sign in</Button>*/}
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <span style={{borderBottom: '1px dashed'}}>Ivan</span>
                    <img style={{width: '36px', marginLeft: '12px'}} src={avatar} alt="Avatar"/>
                </div>
            </header>
            <div className='container'>
                <Routes>
                    <Route path='/' element={<Login/>}/>
                    <Route path='/registration' element={<Registration/>}/>
                    <Route path='/password-recovery-form' element={<PasswordRecoveryForm/>}/>
                    <Route path='/password-recovery-email' element={<PasswordRecoveryEmail/>}/>
                    <Route path='/new-password-entering-form' element={<NewPasswordEnteringForm/>}/>
                    <Route path='/profile' element={<Profile/>}/>
                </Routes>
            </div>
        </div>
    )
}

export default App
