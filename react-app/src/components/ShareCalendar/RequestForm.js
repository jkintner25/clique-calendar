import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { sendInvite } from "../../store/invites";

const FormContainer = styled.div`
display: flex;
flex-direction: column;
&& button {
    width: 20px;
}
`

function RequestForm({myCalendars, setShare}) {
    const dispatch = useDispatch()

    const [calendarId, setCalendarId] = useState(Number(myCalendars[0].id))
    const [userEmail, setUserEmail] = useState('')
    const [message, setMessage] = useState('Share this calendar with me!')
    const [errors, setErrors] = useState([])
    const user = useSelector(state=>state.session.user)

    useEffect(()=>{
        setErrors([])
    }, [userEmail])

    function changeCalendar(e) {
        setCalendarId(Number(e))
    }

    const sendShareRequest = (e) => {
        e.preventDefault()

        const invitation = {
            calendarId: calendarId,
            recipientEmail: userEmail,
            message: message,
            senderId: user.id,
            senderUsername: user.username
        }

        dispatch(sendInvite(invitation)).then(res=>{
            if (res.errors) {
                setErrors(res.errors)
            } else {
                setShare(false)
            }
        })

    }

    return (
        <div>
            {errors.length > 0 && errors.map((error, i = 0) => {
                return <p key={i}>{error}</p>
            })}
            <h2>Share a Calendar</h2>
            <form onSubmit={sendShareRequest}>
                <FormContainer>
                    <label>User's Email Address*</label>
                    <input
                        autoFocus={true}
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                    ></input>
                    <label>Calendar*</label>
                    {myCalendars.length > 0 ?
                        <select
                            multiple={false}
                            value={calendarId}
                            onChange={(e) => changeCalendar(e.target.value)}>
                            {myCalendars && myCalendars.map((calendar) => {
                                return <option key={calendar.id} value={calendar.id}>{calendar.title}</option>
                            })}
                        </select>
                        : <p>You need a Calendar!</p>}
                    <label>Message</label>
                    <textarea
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                    >
                    </textarea>
                    <button disabled={errors.length > 0}>Share</button>
                </FormContainer>
            </form>
        </div>
    );
};

export default RequestForm;
