import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import styled from 'styled-components';
import { createMessage, getMessages } from '../../store/messages';
import Room from './Rooms';

const ChatWindow = styled.div`
display: flex;
flex-direction: column;
width: 700px;
height: 300px;
padding: 20px;
`
const OuterDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
width: 98%;
height: auto;
padding-bottom: 60px;
margin-top: 100px;
background-color: #f4f1de;
`

const MessagesWindow = styled.div`
width: 100%;
height: 260px;
background-color: #f4f1de;
padding: 20px;
overflow-y: auto;

`
const CalendarList = styled.ul`
display: flex;
flex-direction: column;
height: auto;
width: 120px;
padding: 20px;
background-color: #f4f1de;
z-index: 5;
`

let socket;

const Chat = () => {
    const dispatch = useDispatch()
    const user = useSelector(state => state.session.user)
    const [messages, setMessages] = useState([]);
    const [chatInput, setChatInput] = useState("");
    const [errors, setErrors] = useState([]);
    const shared = useSelector(state => state.calendars.shared)
    const owned = useSelector(state => state.calendars.owned)
    const [calendars, setCalendars] = useState([])
    const [title, setTitle] = useState('')
    const [previousTitle, setPreviousTitle] = useState('')
    const [calendarId, setCalendarId] = useState(null)

    const messagesRef = useRef(null);

    const scrollToBottom = () => {
        messagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages]);

    useEffect(() => {
        if (!shared && !owned) return;
        let a = Object.values(shared)
        let b = Object.values(owned)
        setCalendars([...a, ...b])
    }, [shared, owned])

    useEffect(() => {

        socket = io();

        socket.on("chat", (chat) => {

            setMessages(messages => [...messages, chat])
        })

        socket.on('join', (chat) => {
            setMessages(messages => [...messages, chat])
        })

        socket.on('leave', (chat) => {
            setMessages(messages => [...messages, chat])
        })

        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [])

    const sendChat = (e) => {
        e.preventDefault()

        if (!title.length) {
            setErrors(['Join a calendar chat room!'])
            return;
        };
        setErrors([])

        const newMessage = {
            msg: chatInput,
            calendarId: calendarId,
            userId: user.id,
            username: user.username
        }

        dispatch(createMessage(newMessage))

        socket.emit("chat", { username: user.username, msg: chatInput, room: title });

        setChatInput("")
    }

    // function that sets current room (caltitle) and cal.id to grab
    const joinRoom = (calTitle, id) => {
        if (title.length && calTitle !== title) {
            setPreviousTitle(title)
        }
        setTitle(calTitle)
        setCalendarId(id)
    }

    // get all messages of calendar(room)
    useEffect(()=>{
        if (!calendarId) return;
        dispatch(getMessages(calendarId)).then(res=>{
            if (res.messages) setMessages(Object.values(res.messages))
            if (res.errors) setErrors(res.errors)
        })
    }, [calendarId])

    // send message when user joins new room
    useEffect(() => {
        if (!title) return;
        socket.emit('join', { username: 'Room Bot', msg: `${user.username} has entered ${title}.`, room: title })
    }, [title])

    // send message when user leave a room
    useEffect(() => {
        if (!previousTitle) return;
        socket.emit('leave', { username: 'Room Bot', msg: `${user.username} has left ${previousTitle}.`, room: previousTitle })
    }, [previousTitle])

    function updateChat(e) {
        setChatInput(e.target.value)
    }

    return (
        <OuterDiv>
            <CalendarList>
                {calendars.length && calendars.map(calendar => {
                    return <Room key={calendar.id} calendarId={calendar.id} calendarTitle={calendar.title} joinRoom={joinRoom} />
                })}
            </CalendarList>
            <ChatWindow>
                <MessagesWindow>
                    {messages.map((message, i) => (
                        <div
                        ref={messagesRef}
                        key={i}>{`${message.username}: ${message.msg}`}</div>
                    ))}
                </MessagesWindow>
                {errors.length > 0 && errors.map((error, i) => {
                    return <p key={i}>{error}</p>
                })}
                <form onSubmit={sendChat}>
                    <input value={chatInput} onChange={(e) => updateChat(e)}></input>
                    <button type='submit'>Send</button>
                </form>
            </ChatWindow>
        </OuterDiv>
    );
};

export default Chat;
