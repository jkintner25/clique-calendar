import { useEffect, useState } from "react";
import Event from "./EventComponent";
import styled from 'styled-components';

const EventsListContainer = styled.div`
height: 380px;
overflow-y: auto;
`

function EventsList({ eventsState, isClicked }) {
    const [newEvents, setNewEvents] = useState([])
    const [events, setEvents] = useState(null)

    useEffect(()=>{
        if(!eventsState || eventsState.length < 0) return;
        setEvents(Object.values(eventsState))
    }, [eventsState])

    useEffect(()=>{
        if(!events) return;
        convertDatesToLocal()
    }, [events])

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


    return (
        <EventsListContainer>
            {newEvents.length > 0 ?
                <div>
                    {newEvents.map(event => {
                        return <Event key={event.id} event={event} isClicked={isClicked} />
                    })}
                </div>
                : <div>
                    <p>No events to display.</p>
                    <p>Click on a calendar or create an event!</p>
                </div>
            }
        </EventsListContainer>
    );
};

export default EventsList;
