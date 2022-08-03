import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMyCalendars } from "../../store/calendars"
import Calendar from "./CalTitles"


function SidebarPanel() {
    const dispatch = useDispatch()
    const userId = useSelector(state=>state.session.user.id)
    const myCalendars = Object.values(useSelector(state=>state.calendars))

    useEffect(()=>{
        dispatch(getMyCalendars(userId))
    }, [dispatch])

    return (
        <>
            {myCalendars ? myCalendars.map(calendar=>{
                return <Calendar key={calendar.id} calendar={calendar} />
            }) : <p>You don't have any Calendars</p>}
        </>
    )
};

export default SidebarPanel;
