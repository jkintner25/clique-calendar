import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createEvent } from "../../store/events"
import styled from "styled-components";

const FormContainer = styled.div`
display: flex;
flex-direction: column;
`

function EventForm({setCreateEvent}) {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user.id)
    const myCalendars = Object.values(useSelector(state => state.calendars))

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [calendarId, setCalendarId] = useState(-1)
    const [startTimeGMT, setStartTimeGMT] = useState(new Date().toString().slice(16, 24))
    const [endTimeGMT, setEndTimeGMT] = useState(new Date().toString().slice(16, 24))
    const [errors, setErrors] = useState([])

    useEffect(() => {
        if (startDate === '' || endDate === '') return;
        setStartTimeGMT(new Date(startDate).toUTCString())
        setEndTimeGMT(new Date(endDate).toUTCString())
    }, [startDate, endDate])

    useEffect(() => {
        if (!myCalendars[0]) return;
        if (calendarId === -1) setCalendarId(myCalendars[0].id)
    }, [myCalendars])

    useEffect(() => {
        let validationErrors = []
        if (!title) validationErrors.push('Your event needs a title.')
        if (startDate > endDate) validationErrors.push('End date cannot come before start date.')
        if (!startDate) validationErrors.push('Your event needs a start date.')
        if (!endDate) validationErrors.push('Your event needs an end date.')
        if (calendarId.length > 3) validationErrors.push('Your event needs a calendar.')
        setErrors(validationErrors)
    }, [title, startDate, endDate, calendarId])

    const submitEvent = (e) => {
        e.preventDefault()

        const newEvent = {
            title: title,
            description: description,
            startDate: startTimeGMT,
            endDate: endTimeGMT,
            userId: userId,
            calendarId: calendarId
        }
        dispatch(createEvent(newEvent))
        setCreateEvent(false)
    }

    return (
        <div>
            {errors && errors.map((error, i = 0) => {
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
                        onChange={(e) => setStartDate(e.target.value)}
                    >
                    </input>
                    <label>End Date</label>
                    <input
                        type="datetime-local"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
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
