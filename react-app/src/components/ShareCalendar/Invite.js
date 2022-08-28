import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateInvite } from "../../store/invites";
import { addSharedCalendar } from "../../store/session";

function Invite({ invite }) {
    const dispatch = useDispatch()
    const [errors, setErrors] = useState([])

    function acceptInvite() {
        const data = {
            accepted: 'true'
        }
        dispatch(updateInvite(invite.id, data)).then(res=>{
            if (res.errors) setErrors(res.errors)
            else {
                dispatch(addSharedCalendar(res))
            }
        })
    }

    function rejectInvite() {
        const data = {
            accepted: 'false'
        }
        dispatch(updateInvite(invite.id, data))
    }

    return (
        <>
            {errors.length > 0 && errors.map((error, i)=>{
                return <li key={i}>{error.message}</li>
            })}
            <li>
                <p>From: {invite.senderUsername}</p>
                <p>Calendar: {invite.calendarTitle}</p>
                <p>Message: {invite.message}</p>
            </li>
            <button type="button" onClick={() => acceptInvite()}>Accept</button>
            <button type="button" onClick={() => rejectInvite()}>Reject</button>
        </>
    )
}

export default Invite;
