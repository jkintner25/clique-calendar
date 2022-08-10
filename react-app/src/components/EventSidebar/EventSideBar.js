import { useSelector } from "react-redux";
import styled from "styled-components";
import EventDetails from "./EventDetails";
import EventsList from "./EventsList";
import './eventSidebar.css'

import plusSign from '../../images/add.png'
import { useState } from "react";

const EditButton = styled.img`
height: 25px;
width: 25px;
transition-property: transform;
transition-duration: .4s;
&:hover {
    cursor: pointer;
}
`

const EditEventsP = styled.p`
margin-left: 8px;
cursor: default;
`

const EventPanelFooter = styled.div`
position: relative;
display: flex;
flex-direction: row;
width: 200px;
height: 30px;
margin: 0 0 0 -2px;
align-items: center;
`

const EventsSidebarBox = styled.div`
display: flex;
flex-direction: column;
width: 250px;
height: 605.5px;
margin: 0 0 0 25px;
background-color: #f4f1de;
`
const EventsContentBox = styled.div`
margin: 0px 8px;
`

function EventsSideBar() {
    const eventsState = useSelector(state => state.events)
    const [isClicked, setIsClicked] = useState(false)

    function showEditButtons() {
        setIsClicked(!isClicked)
    }

    function setImgClass() {
        if (!isClicked) return '';
        if (isClicked) return 'rotate';
    }

    return (
        <EventsSidebarBox>
            <EventsContentBox>
                <EventsList eventsState={eventsState} isClicked={isClicked} />
                <EventDetails />
                <EventPanelFooter>
                    <EditButton src={plusSign} onClick={() => showEditButtons()} className={setImgClass()} />
                    <EditEventsP>Edit Events</EditEventsP>
                </EventPanelFooter>
            </EventsContentBox>
        </EventsSidebarBox>

    );
};

export default EventsSideBar;
