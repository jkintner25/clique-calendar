import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createCalendar } from "../../store/calendars";
import styled from "styled-components";


function CalendarForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [title, setTitle] = useState('');

    const userId = useSelector(state=>state.session.user.id)

    const updateTitle = (e) => {
        setTitle(e.target.value)
    }

    const createNewCalendar = (e) => {
        e.preventDefault()
        const calendar = {
            title: title,
            userId: userId
        }
        dispatch(createCalendar(calendar))
        history.push('/calendars')
    }

    return (
        <>
            <form onSubmit={createNewCalendar}>
                <label>Title</label>
                <input className="calendar-title-input" autoFocus={true} type="text" value={title} onChange={updateTitle}></input>
                <button type="submit">Create</button>
            </form>
        </>
    )
};

export default CalendarForm;
