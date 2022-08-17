import React, { useEffect, useState } from 'react'
import { Avatar, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import { useParams } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import firebase from 'firebase/compat/app';
import db from './firebase';
import './Chat.css'

const Chat = () => {

    const [seed, setSeed] = useState('');
    const [input, setInput] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId){
            db.collection('rooms')
            .doc(roomId)
            .onSnapshot((snapshot) => 
                setRoomName(snapshot.data().name));

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => (
                setMessages(snapshot.docs.map(doc => doc.data()))
            ))
        }
    }, [roomId])

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput('');
    }

  return (
    <div className='chat flex-[0.65] flex flex-col'>
        <div className="chat__header p-[15px] flex items-center border-b-[1px] border-b-[lightgray] border-solid">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="chat_headerInfo flex-1 pl-[20px]">
                <h3 className='font-bold mb-[3px]'>{roomName}</h3>
                <p className='text-[gray]'>Last seen{" "}
                {new Date(
                    messages[messages.length - 1]?.timestamp?.toDate()
                    ).toUTCString()}
                </p>
            </div>
            <div className="chat__headerRight flex justify-between min-w-[100px]">
                <IconButton>
                    <SearchIcon/>
                </IconButton>
                <IconButton>
                    <AttachFileIcon/>
                </IconButton>
                <IconButton>
                    <MoreVertIcon/>
                </IconButton>  
            </div>
        </div>
        <div className="chat__body bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] flex-1 bg-repeat bg-center p-[30px] overflow-scroll">
            {messages.map(message => (

                <p className={`chat__message ${message.name === user.displayName && 'chat__receiver'}`}>
                <span className="chat__name absolute top-[-16px] font-bold text-xs">{message.name}</span>
                {message.message}
                <span className="chat__time ml-[10px] text-[0.65rem]">
                    {new Date(message.timestamp?.toDate()).toUTCString()}
                </span>
            </p>
            ))}
            
        </div>
        <div className="char__footer flex justify-between items-center h-[62px] border-t-[1px] border-t-[lightgray] border-solid mx-6">
            <InsertEmoticonIcon/>
            <form className='flex-[0.95] flex'>
                <input value={input} onChange={(e) => setInput(e.target.value)} className='flex-1 rounded-[25px] p-[10px] border-none' type="text" placeholder='Type a message'/>
                <button onClick={sendMessage} type='submit' className='hidden'>Send a message</button>
            </form>
            <MicIcon/>
        </div>
    </div>
  )
}

export default Chat