import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createCalendar } from "../../store/calendars";


function CalendarForm({setCreateCalendar}) {
    const dispatch = useDispatch()
    const history = useHistory()
    const [title, setTitle] = useState('');
    const [typed, setTyped] = useState(false)
    const [errors, setErrors] = useState([])
    const userId = useSelector(state=>state.session.user.id)

    useEffect(()=>{
        if (!typed) return;
        let validationErrors = [];
        if (!title) validationErrors.push('Title is required.')
        if (title.length > 30) validationErrors.push('Title length cannot exceed 30 characters.')
        setErrors(validationErrors)
    }, [title])

    const updateTitle = (e) => {
        if (!typed) setTyped(true)
        setTitle(e.target.value)
    }

    const createNewCalendar = async (e) => {
        e.preventDefault()
        const calendar = {
            title: title,
            userId: userId
        }
        const response = await dispatch(createCalendar(calendar))
        if(response.id) setCreateCalendar(false);
        else setErrors(response.errors)
    }

    return (
        <>
        {errors.length > 0 && errors.map((error, i = 0) => {
                return <p key={i}>{error}</p>
            })}
            <form onSubmit={createNewCalendar}>
                <label>Title</label>
                <input className="calendar-title-input" autoFocus={true} type="text" value={title} onChange={updateTitle}></input>
                <button type="submit">Create</button>
            </form>
        </>
    )
};

export default CalendarForm;
