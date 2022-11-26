import React, {ChangeEvent, useState} from 'react';
import edit from "./assets/edit.svg";
import TextField from "@mui/material/TextField/TextField";

export const EditableSpan = () => {

    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState('Ivan')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.value)
    }

    return (
        <>
            {editMode ? <>
                    <TextField value={name} className='textField' onChange={onChangeHandler} type='text'
                                     label="Nickname"
                                     variant="standard"/>
                    <button className='saveButton' onClick={() => setEditMode(false)}>SAVE</button>
                </>
                : <p className='name'>
                    {name}<img style={{position: 'relative', left: '10px', top: '2px'}}
                               onClick={() => setEditMode(true)} src={edit} alt="Edit"/>
                </p>}
        </>
    )
}