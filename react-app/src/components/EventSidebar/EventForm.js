import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createEvent } from "../../store/events"
import styled from "styled-components";
import dayjs from 'dayjs';
import { useSetCalendar } from "../Context/CalendarContext";
const utc = require('dayjs/plugin/utc.js')
dayjs.extend(utc)

const FormContainer = styled.div`
display: flex;
flex-direction: column;
`

function EventForm({ setCreateEvent }) {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user.id)
    const myCalendars = Object.values(useSelector(state => state.calendars))

    const setActiveCalendar = useSetCalendar()

    const [title, setTitle] = useState('');
    const [emptyTitle, setEmptyTitle] = useState(false);
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [calendarId, setCalendarId] = useState(-1)
    const [startTimeGMT, setStartTimeGMT] = useState(new Date().toString().slice(16, 24))
    const [endTimeGMT, setEndTimeGMT] = useState(new Date().toString().slice(16, 24))
    const [startDateObj, setStartDateObj] = useState(new dayjs())
    const [endDateObj, setEndDateObj] = useState(new dayjs())
    const [startDateSelected, setStartDateSelected] = useState(false)
    const [endDateSelected, setEndDateSelected] = useState(false)
    const [ready, setReady] = useState(false)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if (startDate === '' || endDate === '') return;
        setStartTimeGMT(new Date(startDate).toUTCString())
        setEndTimeGMT(new Date(endDate).toUTCString())
        setReady(true)
    }, [startDate, endDate])

    useEffect(() => {
        if (!ready) return;
        setStartDateObj(dayjs(startTimeGMT).format('YYYY-MM-DD HH:mm'))
        setEndDateObj(dayjs(endTimeGMT).format('YYYY-MM-DD HH:mm'))
    }, [startTimeGMT, endTimeGMT])

    useEffect(() => {
        if (!myCalendars[0]) return;
        if (calendarId === -1) setCalendarId(myCalendars[0].id)
    }, [myCalendars, calendarId])

    useEffect(() => {
        let validationErrors = [];
        if (title.length > 0) setEmptyTitle(true);
        if (!title && emptyTitle) validationErrors.push('Your event needs a title.');
        if ((startDateSelected && endDateSelected) && startDate > endDate) validationErrors.push('End date cannot come before start date.');
        if (!startDate && startDateSelected) validationErrors.push('Your event needs a start date.');
        if (!endDate && endDateSelected) validationErrors.push('Your event needs an end date.');
        if (calendarId === -1) validationErrors.push('Your event needs a calendar.');
        setErrors(validationErrors);
    }, [title, startDate, endDate, calendarId, emptyTitle, startDateSelected, endDateSelected]);

    const submitEvent = async (e) => {
        e.preventDefault()

        const newEvent = {
            title: title,
            description: description,
            startDate: startDateObj,
            endDate: endDateObj,
            userId: userId,
            calendarId: calendarId
        }
        const response = await dispatch(createEvent(newEvent));
        if (response.events) {
            setActiveCalendar(response.events)
            setCreateEvent(false)
        }
        else {
            setErrors(response.errors)
        }
    }

    function changeStartDate(e) {
        setStartDate(e.target.value);
        setStartDateSelected(true);
    };

    function changeEndDate(e) {
        setEndDate(e.target.value);
        setEndDateSelected(true)
    }

    return (
        <div>
            {errors.length > 0 && errors.map((error, i = 0) => {
                return <p key={i}>{error}</p>
            })}
            <form onSubmit={submitEvent}>
                <FormContainer>
                    <label>Title</label>
                    <input
                        autoFocus={true}
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
                        type="datetime-local"
                        value={startDate}
                        onChange={(e) => changeStartDate(e)}
                    >
                    </input>
                    <label>End Date</label>
                    <input
                        type="datetime-local"
                        value={endDate}
                        onChange={(e) => changeEndDate(e)}
                    >
                    </input>
                    <label>Calendar</label>
                    {myCalendars.length > 0 ?
                        <select
                            multiple={false}
                            value={calendarId}
                            onChange={(e) => setCalendarId(e.target.value)}>
                            {myCalendars && myCalendars.map((calendar) => {
                                return <option key={calendar.id}
                                    value={calendar.id}>{calendar.title}</option>
                            })}
                        </select>
                        : <p>You need a Calendar!</p>}
                    <button type="submit" disabled={errors.length > 0}>Submit</button>
                </FormContainer>
            </form>
        </div>
    )
};

export default EventForm;
