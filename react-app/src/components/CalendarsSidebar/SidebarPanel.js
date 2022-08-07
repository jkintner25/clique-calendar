import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMyCalendars } from "../../store/calendars"
import CalendarTitle from "./CalTitles"
import styled from 'styled-components'
import './sidebar.css'

const MyCliques = styled.h1`

`

const CalendarSidebar = styled.div`
display: flex;
flex-direction: column;
width: 240px;
margin: 0 25px 0 0;
background-color: #f4f1de;
`
const SidebarContentBox = styled.div`
margin: 0px 8px;
margin: 16px 2px 16px 20px;
`

function SidebarPanel() {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user.id)
    const myCalendars = Object.values(useSelector(state => state.calendars))

    useEffect(() => {
        dispatch(getMyCalendars(userId))
    }, [dispatch])

    return (
        <CalendarSidebar>
            <SidebarContentBox>
                <MyCliques>My Cliques</MyCliques>
                {myCalendars ? myCalendars.map(calendar => {
                    return <CalendarTitle key={calendar.id} calendar={calendar} />
                }) : <p>You don't have any Calendars</p>}
            </SidebarContentBox>
        </CalendarSidebar>
    )
};

export default SidebarPanel;
