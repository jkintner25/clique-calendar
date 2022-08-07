import { useEffect, useState } from "react";
import Event from "./EventComponent";

function EventsList({ eventsState }) {
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
    }, [eventsState, events.length])

    return (
        <>
            {newEvents.length > 0 ?
                <div>
                    {newEvents.map(event => {
                        return <Event key={event.id} event={event} />
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

export default EventsList;
