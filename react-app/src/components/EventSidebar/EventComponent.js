import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteEvent } from "../../store/events";
import EventEditForm from "./EventEditForm";
import styled from 'styled-components';
import { Modal } from "../Context/ModalContext";
import dayjs from 'dayjs';

const EventBox = styled.ul`
margin: 16px 2px 16px 20px;
list-style: none;
`

function Event({ event }) {
    const dispatch = useDispatch()
    const [showEditForm, setShowEditForm] = useState(false)

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
        dispatch(deleteEvent(thisEvent))
    }

    return (
        <>
            <EventBox>
                <h2>{event.title}</h2>
                <li>Start: {event.startDate}</li>
                <li>End: {event.endDate}</li>
                <button type="button" onClick={() => setShowEditForm(true)}>Edit</button>
                <button type="button" onClick={() => deleteThisEvent(event)}>Delete</button>
            </EventBox>
            {showEditForm &&
                <Modal onClose={() => setShowEditForm(false)}>
                    <EventEditForm event={event} setShowEditForm={setShowEditForm} />
                </Modal>}
        </>
    );
};

export default Event;
