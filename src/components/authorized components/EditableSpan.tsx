import React, {ChangeEvent, useState} from 'react';
import edit from "../../assets/icons/edit.svg";
import TextField from "@mui/material/TextField/TextField";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {updateProfileData} from "../../reducers/authReducer";

export const EditableSpan = () => {

    const dispatch = useAppDispatch()
    const userName = useAppSelector(state => state.auth.userData.name)
    const avatar = useAppSelector(state => state.auth.userData.avatar)

    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState(userName)
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
        dispatch(updateProfileData({name, avatar}))
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
                    {userName}
                    <img title='Click to edit name' style={{position: 'relative', left: '10px', top: '2px', cursor: 'pointer'}}
                         onClick={() => setEditMode(true)} src={edit} alt="Edit"/>
                </p>}
        </>
    )
}