import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createEvent } from "../../store/events"
import styled from "styled-components";

function EventForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [calendarId, setCalendarId] = useState(null)

    const userId = useSelector(state=>state.session.user.id)
    const myCalendars = Object.values(useSelector(state=>state.calendars))

    let errors = []

    useEffect(()=>{
        if(!title)errors.push('Your event needs a title.')
        if(startDate > endDate)errors.push('End date cannot come before start date.')
        if(startTime > endTime)errors.push('End time cannot come before start time.')
        if(!startDate)errors.push('Your event needs a start date.')
        if(!endDate)errors.push('Your event needs an end date.')
        if(!startTime)errors.push('Your event needs a start time.')
        if(!endTime)errors.push('Your event needs an end time.')
        if(!calendarId)errors.push('Your event needs a calendar.')
    }, [title, date, time, calendarId])

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
            calendarId: calendarId
        }
        console.log(newEvent)
        dispatch(createEvent(newEvent))
    }


    return (
        <form onSubmit={submitEvent}>
            <label>Title</label>
            <input
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                >
            </input>
            <label>Description</label>
            <input
                value={description}
                onChange={(e)=>setDescription(e.target.value)}
                >
            </input>
            <label>Start Date</label>
            <input
                type="date"
                pattern="\d{4}-\d{2}-\d{2}"
                value={startDate}
                onChange={(e)=>setStartDate(e.target.value)}
                >
            </input>
            <label>End Date</label>
            <input
                type="date"
                pattern="\d{4}-\d{2}-\d{2}"
                value={endDate}
                onChange={(e)=>setEndDate(e.target.value)}
                >
            </input>
            <label>Start Time</label>
            <input
                type="time"
                pattern="[0-9]{2}:[0-9]{2}"
                value={startTime}
                onChange={(e)=>setStartTime(e.target.value)}>
            </input>
            <label>End Time</label>
            <input
                type="time"
                pattern="[0-9]{2}:[0-9]{2}"
                value={endTime}
                onChange={(e)=>setEndTime(e.target.value)}>
            </input>
            <label>Calendar</label>
            <select
                multiple={false}
                type="text"
                value={calendarId}
                onChange={(e)=>setCalendarId(e.target.value)}>
                {myCalendars && myCalendars.map((calendar)=>{
                    return <option key={calendar.id}
                                value={calendarId}>{calendar.title}</option>
                })}
            </select>
            <button type="submit" disabled={errors.length}>Submit</button>
        </form>
    )
};

export default EventForm;
