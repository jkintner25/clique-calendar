import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateEvent } from "../../store/events";
import styled from "styled-components";

const FormElementContainer = styled.div`
display: flex;
flex-direction: column;
`

function EventEditForm({ event }) {
    const dispatch = useDispatch()
    const history = useHistory()
    const userId = useSelector(state => state.session.user.id)
    const myCalendars = Object.values(useSelector(state => state.calendars))

    const [title, setTitle] = useState(event.title);
    const [description, setDescription] = useState(event.description);
    const [startDate, setStartDate] = useState(event.startDate);
    const [endDate, setEndDate] = useState(event.endDate);
    const [calendarId, setCalendarId] = useState(event.calendarId)
    const [startTimeGMT, setStartTimeGMT] = useState(new Date().toString().slice(16, 24))
    const [endTimeGMT, setEndTimeGMT] = useState(new Date().toString().slice(16, 24))
    const [errors, setErrors] = useState([])

    useEffect(() => {
        setStartTimeGMT(new Date(startDate).toUTCString())
        setEndTimeGMT(new Date(endDate).toUTCString())
    }, [startDate, endDate])

    useEffect(() => {
        let validationErrors = []
        if (!title) validationErrors.push('Your event needs a title.')
        if (startDate > endDate) validationErrors.push('End date cannot come before start date.')
        if (!startDate) validationErrors.push('Your event needs a start date.')
        if (!endDate) validationErrors.push('Your event needs an end date.')
        if (typeof calendarId === 'string') validationErrors.push('Your event needs a calendar.')
        setErrors(validationErrors)
    }, [title, startDate, endDate, calendarId])

    const editEvent = (e) => {
        e.preventDefault()

        const updatedEvent = {
            title: title,
            description: description,
            startDate: startTimeGMT,
            endDate: endTimeGMT,
            userId: userId,
            calendarId: calendarId
        }
        dispatch(updateEvent(event.id, updatedEvent))
    }

    return (
        <div>
            {errors && errors.map((error, i = 0) => {
                return <p key={i}>{error}</p>
            })}
            <form onSubmit={editEvent}>
                <FormElementContainer>
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
                </FormElementContainer>
            </form>
        </div>
    )
}

export default EventEditForm;
