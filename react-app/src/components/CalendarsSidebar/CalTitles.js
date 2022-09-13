import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteCalendar, updateCalendar } from "../../store/calendars";
import { cleanEvents, getAllCalendarEvents } from "../../store/events";
import { useSetCalendar } from "../Context/CalendarContext";
import { Modal } from "../Context/ModalContext";
import './sidebar.css'
import styled from 'styled-components'
import { clearEvent } from "../../store/selectedEvent";

const CalTitleDiv = styled.div`
margin: 0 0 8px 12px;
`
const CalendarTitleH2 = styled.h2`
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
font-weight: lighter;
`

function CalendarTitle({ calendar, isClicked, selected, setSelected }) {
    const dispatch = useDispatch()
    const [title, setTitle] = useState(calendar.title)
    const [update, setUpdate] = useState(false)
    const [showDeleteForm, setShowDeleteForm] = useState(false)
    const setActiveCalendar = useSetCalendar()
    const [errors, setErrors] = useState([])
    const selectedEvent = useSelector(state=>state.selectedEvent)

    const renameTitle = async () => {
        const newCalendar = {
            id: calendar.id,
            title: title,
            userId: calendar.userId
        }
        await dispatch(updateCalendar(calendar.id, newCalendar)).then(res => {
            if (res.id) setUpdate(false)
            if (res.errors) setErrors(res.errors)
        })
    }

    useEffect(() => {
        let validationErrors = []
        if (title.length > 30) validationErrors.push('Title length cannot exceed 30 characters.')
        setErrors(validationErrors)
    }, [title])

    useEffect(()=>{
        if(!selectedEvent) return;
        setSelected(selectedEvent.calendarId)
    }, [selectedEvent])

    const deleteThisCalendar = () => {
        dispatch(cleanEvents())
        dispatch(deleteCalendar(calendar))
    }

    const getAllMyEvents = () => {
        dispatch(getAllCalendarEvents(calendar.id)).then(events => {
            setActiveCalendar(events)
        })
        setSelected(calendar.id)
        dispatch(clearEvent())
    }

    function styled() {
        if (selected === calendar.id) return 'calendar-titles selected-title'
        else return 'calendar-titles'
    }

    return (
        <div>
            <CalTitleDiv className="box-wrap">
                <CalendarTitleH2 className={styled()} onClick={getAllMyEvents} >{calendar.title}</CalendarTitleH2>
                {isClicked &&
                    <div>
                        <button
                            onClick={() => setUpdate(true)}>
                            Rename
                        </button><button
                            onClick={()=>setShowDeleteForm(true)}>
                            Delete
                        </button>
                    </div>
                }
            </CalTitleDiv>
            {update &&
                <Modal onClose={() => setUpdate(false)}>
                    <div>
                        {errors.length > 0 && errors.map((error, i) => {
                            return <p key={i}>{error}</p>
                        })
                        }
                        <h2>Edit Calendar</h2>
                        <label>Title*</label>
                        <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
                        <button
                            type="button"
                            onClick={() => setUpdate(!update)}>
                            Cancel
                        </button><button
                            type="button"
                            onClick={renameTitle}>
                            Save
                        </button>
                    </div>
                </Modal>
            }
            {showDeleteForm &&
                <Modal onClose={()=> setShowDeleteForm(false)}>
                    <div>
                        <p>Are you sure you want to delete {calendar.title}?</p>
                        <button type="button" onClick={()=>setShowDeleteForm(false)}>Cancel</button>
                        <button type="button" onClick={()=>deleteThisCalendar()}>Confirm</button>
                    </div>
                </Modal>}
        </div>
    )
};

export default CalendarTitle;
