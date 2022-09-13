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
& input {
    width: 80%;

}
& form {
    display: flex;
    flex-direction: row;
    padding: 30px 0;
}
`
const OuterDiv = styled.div`
display: flex;
flex-direction: row;
justify-content: center;
width: auto;
max-width: 1100px;
height: 350px;
margin: 100px 20% 0 20%;
background-color: #f4f1de;
`
const FakeDiv = styled.div`
display: flex;
flex-direction: column;
height: 100px;
background-color: white;
`

const MessagesWindow = styled.div`
width: auto;
height: 170px;
background-color: white;
padding: 20px;
overflow-y: auto;

`

const LeftSide = styled.div`
display: flex;
flex-direction: column;
margin: 16px 0;
`

const CliquesTitle = styled.h1`
margin: 0 6px 10px 6px;
font-weight: lighter;
`

const CalendarList = styled.ul`
height: 300px;
width: auto;
background-color: #f4f1de;
z-index: 5;
align-items: center;
overflow-y: auto;
overflow-x: hidden;
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
    const [selected, setSelected] = useState(null)

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

        return (() => {
            socket.disconnect()
        })
    }, [])

    const sendChat = (e) => {
        e.preventDefault()

        if (!title.length) {
            setErrors(['Join a clique chat room.'])
            return;
        };

        if (!chatInput.length) {
            setErrors(['Messages can\'t be blank.'])
            return;
        }

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

    // function that sets current room (caltitle) and calendar id
    const joinRoom = (calTitle, id) => {
        setErrors([])
        if (title.length && calTitle !== title) {
            setPreviousTitle(title)
        }
        setTitle(calTitle)
        setCalendarId(id)
        setSelected(id)
    }

    // get all messages of calendar(room)
    useEffect(() => {
        if (!calendarId) return;
        dispatch(getMessages(calendarId)).then(res => {
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
        <>
            <OuterDiv>
                <LeftSide>
                    <CliquesTitle>Cliques</CliquesTitle>
                    <CalendarList>
                        {calendars.length && calendars.map(calendar => {
                            return <Room key={calendar.id} selected={selected} calendarId={calendar.id} calendarTitle={calendar.title} joinRoom={joinRoom} />
                        })}
                    </CalendarList>
                </LeftSide>
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
                        <button type='submit'>Send</button>
                        <input placeholder='Message' value={chatInput} onChange={(e) => updateChat(e)}></input>
                    </form>
                </ChatWindow>
            </OuterDiv>
            <FakeDiv />
        </>
    );
};

export default Chat;
