import { useSelector } from "react-redux";
import { useEvent } from "../Context/EventContext";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';


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
        event.startDate = dayjs(event.startDate).format('dddd, MMM D, h:mm a')
        event.endDate = dayjs(event.endDate).format('dddd, MMM D, h:mm a')
        setUpdatedEvent(true)
    }, [event])


    return (
        <div>
            {event && updatedEvent ? <div>
                <h3>{event.title}</h3>
                <p>Start: {event.startDate}</p>
                <p>End: {event.endDate}</p>
                <p>Details: {event.description}</p>
            </div> : <p>Select an event...</p>}
        </div>
    );
};

export default EventDetails;
