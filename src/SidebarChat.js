import React, { useEffect, useState } from 'react'
import { Avatar } from '@mui/material'
import { Link } from 'react-router-dom';
import db from './firebase'

const SidebarChat = ({id, name, addNewChat}) => {

    const [seed, setSeed] = useState('');
    const [messages, setMessages] = useState("");

    useEffect(() => {
      if(id) {
        db.collection('rooms').doc(id).collection('messages').orderBy('timestamp', 'desc').onSnapshot((snapshot) => 
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
      }
    }, [id]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const createChat = () => {
        const roomName = prompt('Enter a name for this chat room');
        if (roomName) {
            db.collection('rooms').add({
                name: roomName,
            });
        }
    }

  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
    <div className='sidebarChat flex p-[20px] cursor-pointer border-b-[#f6f6f6] border-b-[1px] border-solid hover:bg-[#ebebeb]'>
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
        <div className="sidebarChat__info ml-[15px]">
            <h2 className='font-bold mb-[8px]'>{name}</h2>
            <p>{messages[0]?.message}</p>
        </div>
    </div>
    </Link>
  ) : (
    <div className='sidebarChat flex p-[20px] cursor-pointer border-b-[#f6f6f6] border-b-[1px] border-solid hover:bg-[#ebebeb]' onClick={createChat}>
        <h2 className='font-bold mb-[8px]'>Add new chat</h2>
    </div>
  )
}

export default SidebarChat