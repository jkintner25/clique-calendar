import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../../store/events";
import EventEditForm from "./EventEditForm";
import styled from 'styled-components';

const EventBox = styled.ul`
margin: 16px 2px 16px 20px;
list-style: none;
`

function Events({ eventsState }) {
    const dispatch = useDispatch()
    const [editId, setEditId] = useState(-1)
    const [newEvents, setNewEvents] = useState([])
    const events = Object.values(eventsState)

    const convertDatesToLocal = () => {
        const list = events.map(event => {
            return {
                ...event,
                startDate: new Date(event.startDate).toLocaleString('en-US', { 'hour12': true }).slice(0, -6) +
                    new Date(event.startDate).toLocaleString('en-US', { 'hour12': true }).slice(-3),
                endDate: new Date(event.endDate).toLocaleString('en-US', { 'hour12': true }).slice(0, -6) +
                    new Date(event.endDate).toLocaleString('en-US', { 'hour12': true }).slice(-3)
            };
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
                        return <EventBox key={event.id}>
                            <h2>{event.title}</h2>
                            <li>Start: {event.startDate}</li>
                            <li>End: {event.endDate}</li>
                            <button type="button" onClick={() => editEvent(event.id)}>Edit</button>
                            <button type="button" onClick={() => deleteThisEvent(event)}>Delete</button>
                            {editId === event.id && <EventEditForm event={event} />}
                        </EventBox>
                    })}
                </div>
                : <div>
                    <p>No events to display.</p>
                    <p>Click on a calendar or create an event!</p>
                </div>
            }
        </>
    );
};

export default Events;
