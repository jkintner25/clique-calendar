import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../../store/events";
import EventEditForm from "./EventEditForm";
import styled from 'styled-components';

const EventDetails = styled.ul`

`

function Events({events}) {
    const dispatch = useDispatch()
    const [localDate, setLocalDate] = useState(false)
    const [editId, setEditId] = useState(-1)

    const convertDatesToLocal = () => {
        return events.forEach(event => {
            event.startDate = new Date(event.startDate).toLocaleString('en-US', {'hour12': true})
            event.endDate = new Date(event.endDate).toLocaleString('en-US', {'hour12': true})
        })
    }

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
        {localDate && events.length > 0 ?
            <div>
                {events.map(event => {
                    return <div key={event.id}>
                        <p>{event.title}</p>
                        {event.description && <li>{event.description}</li>}
                        <li>Start: {event.startDate}</li>
                        <li>End: {event.endDate}</li>
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
