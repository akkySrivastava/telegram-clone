import React, {useEffect, useState} from 'react'
import './Sidebar.css'
import SearchIcon from '@material-ui/icons/Search'
import BorderColorOutlinedIcon from '@material-ui/icons/BorderColorOutlined'
import { Avatar, IconButton } from '@material-ui/core'
import SidebarThread from './SidebarThread'
import PhoneOutlinedIcon from '@material-ui/icons/PhoneOutlined'
import QuestionAnswerOutlinedIcon from '@material-ui/icons/QuestionAnswerOutlined'
import SettingsIcon from '@material-ui/icons/Settings'
import db, { auth } from '../firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/counter/userSlice'

const Sidebar = () => {

    const user = useSelector(selectUser)
    const[thread, setThreads] = useState([]);

    useEffect(() =>{
        db.collection('threads').onSnapshot((snapshot) =>
            setThreads(snapshot.docs.map((doc) =>({
                id: doc.id,
                data: doc.data()
            })))
        )
    }, [])

    const addThread = () =>{
        const threadName = prompt('Enter a thread name')
        db.collection('threads').add({
            threadName: threadName,
        })
    }

    return (
        <div className = "sidebar">
            <div className = "sidebar__header">
                <div className = "sidebar__search">
                    <SearchIcon className = "sidebar__searchIcon" />
                    <input placeholder = "Search" className = "sidebar__input"/>
                </div>
                <IconButton variant = "outlined" id = "sidebar__button">
                    <BorderColorOutlinedIcon onClick = {addThread}/>
                </IconButton>
                
            </div>
            <div className = "sidebar__threads">
                { thread.map(({id, data: {threadName}}) => (
                    <SidebarThread
                        key = {id}
                        id = {id}
                        threadName = {threadName}
                    />
                ))}
            </div>
            <div className = "sidebar__bottom">
                <Avatar 
                    src = {user.photo}
                    className = "sidebar__bottom_avatar"
                    onClick = {() => auth.signOut()}
                />
                <IconButton>
                    <PhoneOutlinedIcon />
                </IconButton>
                <IconButton>
                    <QuestionAnswerOutlinedIcon />
                </IconButton>
                <IconButton>
                    <SettingsIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Sidebar
