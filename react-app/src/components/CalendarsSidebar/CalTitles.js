import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteCalendar, updateCalendar } from "../../store/calendars";
import { getAllCalendarEvents } from "../../store/events";
import { useSetCalendar } from "../Context/CalendarContext";
import { Modal } from "../Context/ModalContext";
import './sidebar.css'
import styled from 'styled-components'

const CalTitle = styled.div`
margin: 16px 0 0 0;
`

function CalendarTitle({ calendar }) {
    const dispatch = useDispatch()
    const [title, setTitle] = useState(calendar.title)
    const [update, setUpdate] = useState(false)
    const [edit, setEdit] = useState(false)
    const setActiveCalendar = useSetCalendar()

    const renameTitle = () => {
        const newCalendar = {
            id: calendar.id,
            title: title,
            userId: calendar.userId
        }
        dispatch(updateCalendar(calendar.id, newCalendar))
        setUpdate(false)
    }

    const deleteThisCalendar = () => {
        dispatch(deleteCalendar(calendar))
    }

    const getAllMyEvents = () => {
        setActiveCalendar(calendar)
        dispatch(getAllCalendarEvents(calendar.id))
    }

    return (
        <div>
            <CalTitle className="box-wrap">
                <h2 className="calendar-titles box" onClick={getAllMyEvents} >{calendar.title}</h2>
                {edit &&
                    <div>
                        <button
                            onClick={() => setUpdate(true)}>
                            Rename
                        </button><button
                            onClick={deleteThisCalendar}>
                            Delete
                        </button>
                    </div>
                }
            </CalTitle>
            {update &&
                <Modal onClose={() => setUpdate(false)}>
                    <div>
                        <input value={title} onChange={(e) => setTitle(e.target.value)}></input>
                        <button
                            onClick={() => setUpdate(!update)}>
                            Cancel
                        </button><button
                            onClick={renameTitle}>
                            Save
                        </button>
                    </div>
                </Modal>
            }
        </div>
    )
};

export default CalendarTitle;
