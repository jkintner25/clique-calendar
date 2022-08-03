import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import styled from "styled-components";
import { createCalendar } from "../../store/calendars";

function CalendarForm() {
    const dispatch = useDispatch()
    const history = useHistory()
    const [title, setTitle] = useState('');

    const updateTitle = (e) => {
        setTitle(e.target.value)
    }

    const createNewCalendar = () => {
        const calendar = {
            title: title
        }
        dispatch(createCalendar(calendar)).then(()=>{
            history.push('/calendars')
        })
    }

    return (
        <>
            <form>
                <label>Title</label>
                <input type="text" value={title} onChange={updateTitle}></input>
            </form>
        </>
    )
};

export default CalendarForm;
