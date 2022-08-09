import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMyCalendars } from "../../store/calendars"
import CalendarTitle from "./CalTitles"
import styled from 'styled-components'
import './sidebar.css'

import plusSign from '../../images/add.png'


const EditButton = styled.img`
height: 25px;
width: 25px;
transition-property: transform;
transition-duration: .4s;
&:hover {
    cursor: pointer;
}
`

const CalendarBoxFooter = styled.div`
position: relative;
display: flex;
flex-direction: row;
width: 200px;
height: 30px;
margin: 0 0 4px 5px;
align-items: center;
`

const EditCalendarsP = styled.p`
margin-left: 8px;
cursor: default;
`

const MyCalendarsH1 = styled.h1`
cursor: default;
`

const CalendarSidebar = styled.div`
display: flex;
flex-direction: column;
justify-content: space-between;
width: 300px;
height: 605.5px;
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
    const [isClicked, setIsClicked] = useState(false)

    useEffect(() => {
        dispatch(getMyCalendars(userId))
    }, [dispatch, userId])

    function setImgClass() {
        if (!isClicked) return '';
        if (isClicked) return 'rotate';
    }

    function showEditButtons() {
        setIsClicked(!isClicked)
    }

    return (
        <CalendarSidebar>
            <SidebarContentBox>
                <MyCalendarsH1>My Calendars</MyCalendarsH1>
                {myCalendars ? myCalendars.map(calendar => {
                    return <CalendarTitle key={calendar.id} calendar={calendar} isClicked={isClicked} />
                }) : <p>You don't have any Calendars</p>}
            </SidebarContentBox>
            <CalendarBoxFooter>
                <EditButton src={plusSign} onClick={()=>showEditButtons()} className={setImgClass()}/>
                <EditCalendarsP>Edit Calendars</EditCalendarsP>
            </CalendarBoxFooter>
        </CalendarSidebar>
    )
};

export default SidebarPanel;
