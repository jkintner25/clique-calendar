import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Chat from "./Chat";




function MessagesWindow() {
    const [rooms, setRooms] = useState([])
    const shared = useSelector(state=>state.calendars.shared)

    useEffect(()=>{
        if (!shared) return;
        setRooms(Object.values(shared))
    }, [shared])

    return (
        <Chat />
    )
}

export default MessagesWindow;
