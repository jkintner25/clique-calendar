import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import styled from 'styled-components';
import { createMessage, getMessages } from '../../store/messages';

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
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState('');
    const [rooms, setRooms] = useState([])
    const [room, setRoom] = useState(0)
    const [errors, setErrors] = useState([])
    const shared = useSelector(state => state.calendars.shared)
    const owned = useSelector(state => state.calendars.owned)
    const messagesState = useSelector(state=>state.messages)

    useEffect(()=>{
        if (!messagesState) return;
        let a = Object.values(messagesState)
        setMessages(a)
    }, [messagesState])

    useEffect(() => {
        if (!shared && !owned) return;
        let temp = []
        let a = Object.values(owned)
        let b = Object.values(shared)
        setRooms([...a, ...b])
    }, [shared, owned])

    function sendChat(e) {
        e.preventDefault()

        const newMessage = {
            content: chatInput,
            calendarId: room,
            userId: user.id
        }

        dispatch(createMessage(newMessage)).then(res => {
            if (res.errors) {
                setErrors(res.errors)
            } else {
                socket.emit('chat', res)
            }
        })

        setChatInput('')
    }

    useEffect(() => {

        socket = io();

        socket.on('chat', (chat) => {
            setMessages([])
            setMessages(messages => [...messages, chat])
        })

        return (() => {
            socket.disconnect()
        })

    }, []);

    function updateChat(e) {
        setErrors([])
        setChatInput(e.target.value)
    }

    function joinRoom(e) {
        setRoom(e.target.value)
        dispatch(getMessages(e.target.value)).then(data=>{
            setMessages(data)
        })

        socket.emit('join', { username: user.username, calendar_id: room})
    }

    return (
        <OuterDiv>
            <CalendarList>
                {rooms.length > 0 ? rooms.map(room => {
                    return <CalendarTitle
                        key={room.id}
                        value={room.id}
                        onClick={(e) => joinRoom(e)}
                    >{room.title}</CalendarTitle>
                }) : <p>Share a calendar to talk with your clique!</p>}
            </CalendarList>
            <ChatWindow>
                <MessagesWindow>
                    {messages.map((message, ind) => (
                        <div key={ind}>{`${message.username}: ${message.content}`}</div>
                    ))}
                </MessagesWindow>
                {errors.length > 0 && errors.map((error, i) => {
                    return <p key={i}>{error}</p>
                })}
                <form onSubmit={sendChat}>
                    <input value={chatInput} onChange={updateChat}></input>
                    <button type='submit'>Send</button>
                </form>
            </ChatWindow>
        </OuterDiv>
    );
};

export default Chat;
