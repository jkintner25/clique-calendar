import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../../store/events";
import EventEditForm from "./EventEditForm";
import styled from 'styled-components';

const EventDetails = styled.ul`

`

function Events({ eventsState }) {
    const dispatch = useDispatch()
    const [editId, setEditId] = useState(-1)
    const [newEvents, setNewEvents] = useState([])
    const events = Object.values(eventsState)

    const convertDatesToLocal = () => {
        const list = events.map(event => {
            return {...event,
                startDate: new Date(event.startDate).toLocaleString('en-US', { 'hour12': true }).slice(0, -6) +
                new Date(event.startDate).toLocaleString('en-US', { 'hour12': true }).slice(-3),
                endDate: new Date(event.endDate).toLocaleString('en-US', { 'hour12': true }).slice(0, -6) +
                new Date(event.endDate).toLocaleString('en-US', { 'hour12': true }).slice(-3)};
        })
        setNewEvents(list)
    }

    useEffect(() => {
        if (events.length < 1) return;
        convertDatesToLocal()
    }, [eventsState])

    const editEvent = (id) => {
        if (editId === -1) setEditId(id)
        else setEditId(-1)
    }

    const deleteThisEvent = (event) => {
        dispatch(deleteEvent(event))
    }

    return (
        <>
            {newEvents.length > 0 ?
                <div>
                    {newEvents.map(event => {
                        return <div key={event.id}>
                            <p>{event.title}</p>
                            <li>Start: {event.startDate}</li>
                            <li>End: {event.endDate}</li>
                            <button type="button" onClick={() => editEvent(event.id)}>Edit</button>
                            <button type="button" onClick={() => deleteThisEvent(event)}>Delete</button>
                            {editId === event.id && <EventEditForm event={event} />}
                        </div>
                    })}
                </div>
                : <p>You have no events.</p>}
        </>
    );
};

export default Events;
