import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import styled from 'styled-components';

const ChatWindow = styled.div`
display: flex;
flex-direction: column;
width: 700px;
height: 300px;
`
const OuterDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
width: 98%;
height: auto;
padding-bottom: 60px;
margin-top: 100px;
`

const MessagesWindow = styled.div`
width: 100%;
height: 260px;
background-color: #f4f1de;
`
const CalendarList = styled.ul`
display: flex;
flex-direction: column;
height: auto;
width: 120px;
background-color: #f4f1de;
z-index: 5;
`
const CalendarTitle = styled.li`
width: 100%;
height: auto;
border: 1px solid black;
cursor: pointer;
`

let socket;

const Chat = () => {
    const user = useSelector(state => state.session.user)
    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const [rooms, setRooms] = useState([])
    const [room, setRoom] = useState('')
    const shared = useSelector(state=>state.calendars.shared)

    useEffect(()=>{
        if (!shared) return;
        setRooms(Object.values(shared))
    }, [shared])

    function sendChat(e) {
        e.preventDefault()

        socket.emit('chat', { user: user.username, msg: chatInput, calendar_title: room });

        setChatInput('')
    }

    useEffect(() => {

        socket = io();

        socket.on('chat', (chat) => {
            setMessages(messages => [...messages, chat])
        })

        return (() => {
            socket.disconnect()
        })

    }, []);

    function updateChat(e) {
        setChatInput(e.target.value)
    }

    return (
        <OuterDiv>
            <CalendarList>
                {rooms.length > 0 ? rooms.map(room=>{
                    return <CalendarTitle
                        onClick={()=>setRoom(room.title)}
                    >{room.title}</CalendarTitle>
                }) : <p>Share a calendar to talk with your clique!</p>}
            </CalendarList>
            <ChatWindow>
                <MessagesWindow>
                    {messages.map((message, ind) => (
                        <div key={ind}>{`${message.user}: ${message.msg}`}</div>
                    ))}
                </MessagesWindow>
                <form onSubmit={sendChat}>
                    <input value={chatInput} onChange={updateChat}></input>
                    <button type='submit'>Send</button>
                </form>
            </ChatWindow>
        </OuterDiv>
    );
};

export default Chat;
