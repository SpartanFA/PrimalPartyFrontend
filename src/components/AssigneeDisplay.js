import React from 'react'
import '../App.css';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@material-ui/core';

export default function AssigneeDisplay(props){

    console.log(props)

    return (
        <div>
            {props.assigneeInfo.firstName + " " + props.assigneeInfo.lastName}
            <IconButton type="submit" onClick={()=>props.assigneeRemove(props.index)} aria-label="delete">
                <DeleteIcon />
            </IconButton>
        </div>
    )
}