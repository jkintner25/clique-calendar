import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyCalendars } from "../../store/calendars";
import { getMyEvents } from "../../store/events";


function Events() {
    const dispatch = useDispatch()
    const userId = useSelector(state=>state.session.user.id)
    const events = Object.values(useSelector(state => state.events))
    const calendars = useSelector(state=>state.calendars)

    useEffect(()=>{
        dispatch(getMyEvents(userId))
    }, [dispatch])

    useEffect(()=>{
        dispatch(getMyCalendars(userId))
    }, [dispatch])

    return (
        <div>
            {events.length > 0 ? events.map(event => {
                return <div key={event.id}>
                    <p>{event.title}</p>
                    <p>{event.description}</p>
                    <p>{event.startDate}</p>
                    <p>{event.endDate}</p>
                    <p>{event.startTime}</p>
                    <p>{event.endTime}</p>
                </div>
            }) : <p>You have no events.</p>}
        </div>
    );
};

export default Events;
