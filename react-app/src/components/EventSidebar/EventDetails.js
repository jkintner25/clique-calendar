import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import styled from 'styled-components';

const EventDetailsContainer = styled.div`
height: 175px;
margin: 0;
padding: 8px 10px;
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
    const selectedEvent = useSelector(state => state.selectedEvent)
    const [event, setEvent] = useState(null)
    const [selectedStartDate, setSelectedStartDate] = useState(null)
    const [selectedEndDate, setSelectedEndDate] = useState(null)
    const [newEvent, setNewEvent] = useState(null)
    const [updatedEvent, setUpdatedEvent] = useState(false)

    useEffect(()=>{
        if(selectedEvent === null || Object.values(selectedEvent).length < 1) return;
        setEvent(selectedEvent)
        console.log(selectedEvent)
    }, [selectedEvent])

    useEffect(() => {
        if(event === null) return;
        setSelectedStartDate(dayjs(event.startDate).format('ddd, MMM D, h:mm a'))
        setSelectedEndDate(dayjs(event.endDate).format('ddd, MMM D, h:mm a'))
        setNewEvent(event)
    }, [event])

    return (
        <EventDetailsContainer>
            {event && selectedStartDate && selectedEndDate ? <ContentContainer>
                <h2>{event.title}</h2>
                {selectedStartDate && <p>Start: {selectedStartDate}</p>}
                {selectedEndDate && <p>End: {selectedEndDate}</p>}
                <EventDetailsP>Details: {event.description}</EventDetailsP>
            </ContentContainer> : <p>Select an event...</p>}
        </EventDetailsContainer>
    );
};

export default EventDetails;
