import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMyCalendars } from "../../store/calendars"
import CalendarTitle from "./CalTitles"
import styled from 'styled-components'
import './sidebar.css'

import plusSign from '../../images/add.png'
import shareSign from '../../images/share.png'
import { Modal } from "../Context/ModalContext"
import RequestForm from "../ShareCalendar/RequestForm"
import SharedCalendar from "./SharedCalendar"


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
flex-direction: column;
width: 200px;
height: 70px;
margin: 0 0 4px 10px;
align-items: left;
`
const FooterButton = styled.div`
display: flex;
flex-direction: row;
margin: 5px 0;
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
width: 250px;
height: 605.5px;
margin: 0 25px 0 0;
background-color: #f4f1de;
`
const SidebarContentBox = styled.div`
margin: 16px 2px 16px 10px;
height: 270px;
border-bottom: 1px solid black;
overflow-y: auto;
`
const SharedCalendarsBox = styled.div`
margin: 2px 2px 16px 10px;
height: 270px;
overflow-y: auto;
`

function SidebarPanel() {
    const dispatch = useDispatch()
    const userId = useSelector(state => state.session.user.id)
    const myCalendars = Object.values(useSelector(state => state.calendars))
    const sharedCalendars = useSelector(state=>state.session.user.calendars)
    const [isClicked, setIsClicked] = useState(false)
    const [selected, setSelected] = useState(null)
    const [share, setShare] = useState(false)

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
        <>
            <CalendarSidebar>
                <SidebarContentBox>
                    <MyCalendarsH1>My Calendars</MyCalendarsH1>
                    {myCalendars ? myCalendars.map(calendar => {
                        return <CalendarTitle key={calendar.id} selected={selected} setSelected={setSelected} calendar={calendar} isClicked={isClicked} />
                    }) : <p>You don't have any Calendars</p>}
                </SidebarContentBox>
                <SharedCalendarsBox>
                    <MyCalendarsH1>Shared Calendars</MyCalendarsH1>
                    {sharedCalendars && sharedCalendars.length > 0 ? sharedCalendars.map(calendar=>{
                        return <SharedCalendar key={calendar.id} selected={selected} setSelected={setSelected} calendar={calendar} isClicked={isClicked} />
                    })
                    : <p>No Shared Calendars</p>}
                </SharedCalendarsBox>
                <CalendarBoxFooter>
                    <FooterButton>
                        <EditButton src={shareSign} onClick={() => setShare(true)} />
                        <EditCalendarsP>Share a Calendar</EditCalendarsP>
                    </FooterButton>
                    <FooterButton>
                        <EditButton src={plusSign} onClick={() => showEditButtons()} className={setImgClass()} />
                        <EditCalendarsP>Edit Calendars</EditCalendarsP>
                    </FooterButton>
                </CalendarBoxFooter>
            </CalendarSidebar>
            {share && <Modal onClose={()=>setShare(false)}>
                <RequestForm myCalendars={myCalendars} setShare={setShare} />
            </Modal>}
        </>
    )
};

export default SidebarPanel;
