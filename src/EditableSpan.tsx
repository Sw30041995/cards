import React, {ChangeEvent, useState} from 'react';
import edit from "./assets/edit.svg";
import TextField from "@mui/material/TextField/TextField";
import {useAppDispatch, useAppSelector} from "./hooks";
import {UserDataType} from "./cardsAPI";
import {updateProfileData} from "./authReducer";

export const EditableSpan = () => {

    const dispatch = useAppDispatch()
    const userData = useAppSelector<UserDataType>(state => state.auth.userData)

    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState(userData.name)
    const [error, setError] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
        setError('')
    }

    const updateUserName = () => {
        if (name.trim() === '') {
            setError('Required')
            return
        } else if (name.length > 30) {
            setError('No more than 30 characters')
            return
        }
        setEditMode(false)
        dispatch(updateProfileData({name, avatar: userData.avatar}))
    }

    return (
        <>
            {editMode ? <>
                    <div style={{width: '100%', position: 'relative'}}>
                        <TextField error={!!error} value={name} className='textField'
                                   onChange={onChangeHandler} type='text'
                                   label={error ? error : 'Nickname'} variant="standard"/>
                        <button style={{position: 'absolute', top: '18px', right: '10px'}} className='saveButton'
                                onClick={updateUserName}>SAVE
                        </button>
                    </div>
                </>
                : <p className='name'>
                    {userData.name}
                    <img style={{position: 'relative', left: '10px', top: '2px', cursor: 'pointer'}}
                         onClick={() => setEditMode(true)} src={edit} alt="Edit"/>
                </p>}
        </>
    )
}