import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyCalendars } from "../../store/calendars";
import { deleteEvent, getMyEvents } from "../../store/events";
import EventEditForm from "./EventEditForm";


function Events() {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user.id)
    const events = Object.values(useSelector(state => state.events))
    const calendars = useSelector(state => state.calendars)
    const [localDate, setLocalDate] = useState(false)
    const [editId, setEditId] = useState(-1)

    const convertDatesToLocal = () => {
        return events.forEach(event => {
            event.startDate = new Date(event.startDate).toLocaleString()
            event.endDate = new Date(event.endDate).toLocaleString()
        })
    }

    useEffect(() => {
        dispatch(getMyEvents(userId))
    }, [dispatch])

    useEffect(() => {
        dispatch(getMyCalendars(userId))
    }, [dispatch])

    useEffect(() => {
        if (!events) return;
        convertDatesToLocal()
        setLocalDate(true)
    }, [events])

    const editEvent = (id) => {
        if(editId === -1) setEditId(id)
        else setEditId(-1)
    }

    const deleteThisEvent = (event) => {
        dispatch(deleteEvent(event))
    }

    return (
        <>
        {events.length > 0 ?
            <div>
                {localDate && events.map(event => {
                    return <div key={event.id}>
                        <p>{event.title}</p>
                        <p>{event.description}</p>
                        <p>{event.startDate}</p>
                        <p>{event.endDate}</p>
                        <p>{event.startTime}</p>
                        <p>{event.endTime}</p>
                        <button type="button" onClick={()=>editEvent(event.id)}>Edit</button>
                        <button type="button" onClick={()=>deleteThisEvent(event)}>Delete</button>
                        {editId === event.id && <EventEditForm event={event}/>}
                    </div>
                })}
            </div>
        : <p>You have no events.</p>}
        </>
    );
};

export default Events;
