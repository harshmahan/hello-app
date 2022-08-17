
import { Avatar, IconButton } from '@mui/material'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import React, { useState, useEffect } from 'react'
import SidebarChat from './SidebarChat'
import { useStateValue } from './StateProvider';
import db from './firebase'

const Sidebar = () => {

    const [rooms, setRooms] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            })
            ))
        ))
        return () => {
            unsubscribe();
        }
    }, []);

  return (
    <div className="sidebar flex-[0.35] flex flex-col">
        <div className="sidebar__header flex justify-between p-[20px] border-r-[1px] border-r-gray-300 border-solid">
            <Avatar src={user?.photoURL}/>
            <div className="sidebar__headerRight flex items-center justify-between min-w-[10vw]">
                <IconButton>
                    <DonutLargeIcon/>
                </IconButton>
                <IconButton>
                    <ChatIcon/>
                </IconButton>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>
            </div>
        </div>
        <div className="sidebar__search flex items-center bg-[#f6f6f6] h-[39px] p-[10px]">
            <div className="sidebar__searchContainer flex items-center bg-white w-[100%] h-[35px] rounded-[20px]">
                <div className="icon p-[10px] text-gray-400">
                    <SearchIcon/>
                </div>
                <input className='border-none ml-[10px] outline-none' placeholder='Search or start a new chat' type="text" />
            </div>
        </div>
        <div className="sidebar__chats flex-1 overflow-scroll bg-white">
            <SidebarChat addNewChat/>
            {rooms.map(room => (
                <SidebarChat key={room.id} id={room.id} name={room.data.name} />
            ))}
        </div>
    </div>
  )
}

export default Sidebar