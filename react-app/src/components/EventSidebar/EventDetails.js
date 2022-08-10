import { useSelector } from "react-redux";
import { useEvent } from "../Context/EventContext";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import styled from 'styled-components';

const EventDetailsContainer = styled.div`
height: 175px;
margin: 0;
padding: 8px 20px 8px 10px;
overflow-y: auto;
scrollbar-width: none;
border-top: 1px solid black;
`

const ContentContainer = styled.div`
& > * {
    margin: 5px 0;
}
`

const EventDetailsP = styled.p`
overflow-wrap: break-word;
word-wrap: break-word;
hyphens: auto;
`

function EventDetails() {
    const events = useSelector(state=>state.events)
    const selectedEvent = useEvent()
    const [event, setEvent] = useState(null)
    const [updatedEvent, setUpdatedEvent] = useState(false)

    useEffect(()=>{
        if(!events || !selectedEvent) return;
        setEvent(events[selectedEvent.id])
        setUpdatedEvent(false)
    }, [events, selectedEvent])

    useEffect(()=>{
        if(!event) return;
        event.startDate = dayjs(event.startDate).format('ddd, MMM D, h:mm a')
        event.endDate = dayjs(event.endDate).format('ddd, MMM D, h:mm a')
        setUpdatedEvent(true)
    }, [event])


    return (
        <EventDetailsContainer>
            {event && updatedEvent ? <ContentContainer>
                <h2>{event.title}</h2>
                <p>Start: {event.startDate}</p>
                <p>End: {event.endDate}</p>
                <EventDetailsP>Details: {event.description}</EventDetailsP>
            </ContentContainer> : <p>Select an event...</p>}
        </EventDetailsContainer>
    );
};

export default EventDetails;
