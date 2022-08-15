import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEvent } from "../../store/events";
import EventEditForm from "./EventEditForm";
import styled from 'styled-components';
import { Modal } from "../Context/ModalContext";
import dayjs from 'dayjs';
import { clearEvent } from "../../store/selectedEvent";

const EventBox = styled.ul`
margin: 16px 2px 16px 20px;
list-style: none;
`
const DeleteCheck = styled.div`
width: fit-content;
height: fit-content;
`

function Event({ event, isClicked }) {
    const dispatch = useDispatch()
    const [showEditForm, setShowEditForm] = useState(false)
    const [showDeleteForm, setShowDeleteForm] = useState(false)
    const selectedEvent = useSelector(state=>state.selectedEvent)

    const deleteThisEvent = (event) => {
        const thisEvent = {
            id: event.id,
            title: event.title,
            description: event.description,
            startDate: dayjs(event.startDate).format('YYYY-MM-DD HH:mm'),
            endDate: dayjs(event.endDate).format('YYYY-MM-DD HH:mm'),
            userId: event.userId,
            calendarId: event.calendarId
        }
        if(selectedEvent) {
            if(event.id === selectedEvent.id) {
                dispatch(clearEvent())
            }
        }
        dispatch(deleteEvent(thisEvent))
    }

    return (
        <>
            <EventBox>
                <h3>{event.title}</h3>
                <li>Start: {event.startDate}</li>
                <li>End: {event.endDate}</li>
                {isClicked &&
                <>
                <button type="button" onClick={() => setShowEditForm(true)}>Edit</button>
                <button type="button" onClick={() => setShowDeleteForm(true)}>Delete</button>
                </>
                }
            </EventBox>
            {showEditForm &&
                <Modal onClose={() => setShowEditForm(false)}>
                    <EventEditForm event={event} setShowEditForm={setShowEditForm} />
                </Modal>}
            {showDeleteForm &&
                <Modal onClose={()=> setShowDeleteForm(false)}>
                    <DeleteCheck>
                        <p>Are you sure you want to delete {event.title}?</p>
                        <button type="button" onClick={()=>setShowDeleteForm(false)}>Cancel</button>
                        <button type="button" onClick={()=>deleteThisEvent(event)}>Confirm</button>
                    </DeleteCheck>
                </Modal>}
        </>
    );
};

export default Event;
