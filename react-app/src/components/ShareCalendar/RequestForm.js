import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";


function RequestForm() {
    const dispatch = useDispatch()
    const myCalendars = Object.values(useSelector(state => state.calendars))

    const [calendarId, setCalendarId] = useState(myCalendars[0] ? myCalendars[0] : null)
    const [userEmail, setUserEmail] = useState('')

    const sendShareRequest = () => {

    }

    return (
        <div>
            {errors.length > 0 && errors.map((error, i = 0) => {
                return <p key={i}>{error}</p>
            })}
            <h2>Share a Calendar</h2>
            <form onSubmit={()=>sendShareRequest()}>
                <FormContainer>
                    <label>Share With</label>
                    <input></input>
                    <label>Calendar*</label>
                    {myCalendars.length > 0 ?
                        <select
                            multiple={false}
                            value={calendarId}
                            onChange={(e) => setCalendarId(e.target.value)}>
                            {myCalendars && myCalendars.map((calendar) => {
                                return <option key={calendar.id}
                                    value={calendar.id}>{calendar.title}</option>
                            })}
                        </select>
                        : <p>You need a Calendar!</p>}
                    <button type="submit" disabled={errors.length > 0}>Submit</button>
                </FormContainer>
            </form>
        </div>
    );
};

export default RequestForm;
