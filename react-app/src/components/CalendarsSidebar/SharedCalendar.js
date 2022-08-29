import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleanEvents, getAllCalendarEvents } from "../../store/events";
import { removeSharedCalendar } from "../../store/calendars"
import { useSetCalendar } from "../Context/CalendarContext";
import { Modal } from "../Context/ModalContext";
import './sidebar.css'
import styled from 'styled-components'
import { clearEvent } from "../../store/selectedEvent";

const CalTitleDiv = styled.div`
margin: 16px 0 0 0;
`
const CalendarTitleH2 = styled.h2`
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
`

function SharedCalendar({ calendar, isClicked, selected, setSelected }) {
    const dispatch = useDispatch()
    const [showDeleteForm, setShowDeleteForm] = useState(false)
    const setActiveCalendar = useSetCalendar()
    const [errors, setErrors] = useState([])
    const selectedEvent = useSelector(state=>state.selectedEvent)
    const userId = useSelector(state=>state.session.user.id)

    useEffect(()=>{
        if(!selectedEvent) return;
        setSelected(selectedEvent.calendarId)
    }, [selectedEvent])

    const removeThisCalendar = () => {
        const data = {
            calendarId: calendar.id,
            userId: userId
        }
        dispatch(removeSharedCalendar(data))
        dispatch(cleanEvents())
        setShowDeleteForm(false)
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
                            onClick={()=>setShowDeleteForm(true)}>
                            Remove
                        </button>
                    </div>
                }
            </CalTitleDiv>
            {showDeleteForm &&
                <Modal onClose={()=> setShowDeleteForm(false)}>
                    <div>
                        <p>Are you sure you want to remove {calendar.title}?</p>
                        <button type="button" onClick={()=>removeThisCalendar()}>Confirm</button>
                        <button type="button" onClick={()=>setShowDeleteForm(false)}>Cancel</button>
                    </div>
                </Modal>}
        </div>
    )
};

export default SharedCalendar;
