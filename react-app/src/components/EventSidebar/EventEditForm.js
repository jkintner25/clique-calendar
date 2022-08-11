import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateEvent } from "../../store/events";
import styled from "styled-components";
import dayjs from 'dayjs';

const FormElementContainer = styled.div`
display: flex;
flex-direction: column;
`

function EventEditForm({ event, setShowEditForm }) {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user.id)
    const myCalendars = Object.values(useSelector(state => state.calendars))
    const oldStartDate = new Date(event.startDate).toLocaleString();
    const oldEndDate = new Date(event.endDate).toISOString().slice(0, 16)

    const [title, setTitle] = useState(event.title);
    const [emptyTitle, setEmptyTitle] = useState(false)
    const [description, setDescription] = useState(event.description);
    const [startDate, setStartDate] = useState(dayjs(oldStartDate).format('YYYY-MM-DDTHH:mm'));
    const [endDate, setEndDate] = useState(dayjs(oldEndDate).format('YYYY-MM-DDTHH:mm'));
    const [calendarId, setCalendarId] = useState(event.calendarId)
    const [startTimeGMT, setStartTimeGMT] = useState(new Date().toString().slice(16, 24))
    const [endTimeGMT, setEndTimeGMT] = useState(new Date().toString().slice(16, 24))
    const [startDateObj, setStartDateObj] = useState(new dayjs())
    const [endDateObj, setEndDateObj] = useState(new dayjs())
    const [startDateSelected, setStartDateSelected] = useState(false)
    const [endDateSelected, setEndDateSelected] = useState(false)
    const [ready, setReady] = useState(false)
    const [errors, setErrors] = useState([])

    useEffect(() => {
        setStartTimeGMT(new Date(startDate).toUTCString())
        setEndTimeGMT(new Date(endDate).toUTCString())
        setReady(true)
    }, [startDate, endDate])

    useEffect(()=>{
        if (!ready) return;
        setStartDateObj(dayjs(startTimeGMT).format('YYYY-MM-DD HH:mm'))
        setEndDateObj(dayjs(endTimeGMT).format('YYYY-MM-DD HH:mm'))
    }, [startTimeGMT, endTimeGMT, ready])

    useEffect(() => {
        let validationErrors = []
        if (title.length > 0) setEmptyTitle(true);
        if (!title && emptyTitle) validationErrors.push('Your event needs a title.')
        if (startDate > endDate) validationErrors.push('End date cannot come before start date.')
        if (!startDate && startDateSelected) validationErrors.push('Your event needs a start date.')
        if (!endDate && endDateSelected) validationErrors.push('Your event needs an end date.')
        if (typeof calendarId === 'string') validationErrors.push('Your event needs a calendar.')
        setErrors(validationErrors)
    }, [title, startDate, endDate, calendarId, description])

    const editEvent = async (e) => {
        e.preventDefault()

        const updatedEvent = {
            title: title,
            description: description,
            startDate: startDateObj,
            endDate: endDateObj,
            userId: userId,
            calendarId: calendarId
        }
        await dispatch(updateEvent(event.id, updatedEvent)).then(res=>{
            if(res.id){
                setShowEditForm(false)
            } else {
                setErrors(res.errors)
            }
        })
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
            {errors && errors.map((error, i = 0) => {
                return <p key={i}>{error}</p>
            })}
            <h2>Edit Event</h2>
            <form onSubmit={editEvent}>
                <FormElementContainer>
                    <label>Title*</label>
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
                    <label>Start Date*</label>
                    <input
                        type="datetime-local"
                        value={startDate}
                        onChange={(e) => changeStartDate(e)}
                    >
                    </input>
                    <label>End Date*</label>
                    <input
                        type="datetime-local"
                        value={endDate}
                        onChange={(e) => changeEndDate(e)}
                    >
                    </input>
                    <label>Calendar*</label>
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
