import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useHistory } from "react-router-dom";
import { createEvent } from "../../store/events"
// import styled from "styled-components";

function EventForm() {
    const dispatch = useDispatch()
    // const history = useHistory()
    const userId = useSelector(state => state.session.user.id)
    const myCalendars = Object.values(useSelector(state => state.calendars))

    const startDay = new Date().toISOString().slice(0, 10).split('-').join()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState(startDay);
    const [endDate, setEndDate] = useState(startDay);
    const [startTime, setStartTime] = useState(new Date().getHours());
    const [endTime, setEndTime] = useState(new Date().getHours());
    const [calendarId, setCalendarId] = useState(myCalendars[0])
    const [errors, setErrors] = useState([])

    useEffect(() => {
        let validationErrors = []
        if (!title) validationErrors.push('Your event needs a title.')
        if (startDate > endDate) validationErrors.push('End date cannot come before start date.')
        if (startDate === endDate && startTime > endTime) validationErrors.push('End time cannot come before start time.')
        if (!startDate) validationErrors.push('Your event needs a start date.')
        if (!endDate) validationErrors.push('Your event needs an end date.')
        if (!startTime) validationErrors.push('Your event needs a start time.')
        if (!endTime) validationErrors.push('Your event needs an end time.')
        if (!calendarId) validationErrors.push('Your event needs a calendar.')
        setErrors(validationErrors)
    }, [title, startDate, endDate, startTime, endTime, calendarId])

    const submitEvent = (e) => {
        e.preventDefault()
        const newEvent = {
            title: title,
            description: description,
            startDate: startDate,
            endDate: endDate,
            startTime: startTime,
            endTime: endTime,
            userId: userId,
            calendarId: calendarId.id
        }
        console.log(newEvent)
        dispatch(createEvent(newEvent))
    }

    return (
        <div>
            {errors && errors.map((error, i = 0) => {
                return <p key={i}>{error}</p>
            })}
            <form onSubmit={submitEvent}>
                <label>Title</label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                >
                </input>
                <label>Description</label>
                <input
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                >
                </input>
                <label>Start Date</label>
                <input
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                >
                </input>
                <label>End Date</label>
                <input
                    type="date"
                    pattern="\d{4}-\d{2}-\d{2}"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                >
                </input>
                <label>Start Time</label>
                <input
                    type="time"
                    pattern="[0-9]{2}:[0-9]{2}"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}>
                </input>
                <label>End Time</label>
                <input
                    type="time"
                    pattern="[0-9]{2}:[0-9]{2}"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}>
                </input>
                <label>Calendar</label>
                <select
                    multiple={false}
                    type="text"
                    value={calendarId}
                    onChange={(e) => setCalendarId(e.target.value)}>
                    {myCalendars && myCalendars.map((calendar) => {
                        return <option key={calendar.id}
                            value={calendarId}>{calendar.title}</option>
                    })}
                </select>
                <button type="submit" disabled={errors.length > 0}>Submit</button>
            </form>
        </div>
    )
};

export default EventForm;
