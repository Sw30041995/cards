import React, {ChangeEvent, useState} from 'react';
import edit from "../../assets/icons/edit.svg";
import TextField from "@mui/material/TextField/TextField";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {updateProfileData} from "../../reducers/authReducer";
import {Button} from "../Button/Button";
import buttonStyles from '../Button/Button.module.css'
import profileStyles from '../authorized components/Profile/Profile.module.css'

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
                    <div className={profileStyles.editableSpanBlock}>
                        <TextField error={!!error} value={name} className='textField'
                                   onChange={onChangeHandler} type='text'
                                   label={error ? error : 'Nickname'} variant="standard"/>
                        <Button className={buttonStyles.saveButton} onClick={updateUserName}>
                            SAVE
                        </Button>
                    </div>
                </>
                : <p className={profileStyles.name}>
                    {userName}
                    <img title='Click to edit name' className={profileStyles.editNameIcon}
                         onClick={() => setEditMode(true)} src={edit} alt="Edit"/>
                </p>}
        </>
    )
}