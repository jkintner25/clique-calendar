import { useSelector } from "react-redux";
import styled from "styled-components";
import EventsList from "./EventsList";

const EventsSidebarBox = styled.div`
display: flex;
flex-direction: column;
width: 240px;
margin: 0 0 0 25px;
background-color: #f4f1de;
`
const EventsContentBox = styled.div`
margin: 0px 8px;
`

function EventsSideBar() {
    const eventsState = useSelector(state=>state.events)

    return (
        <EventsSidebarBox>
            <EventsContentBox>
                <EventsList eventsState={eventsState} />
            </EventsContentBox>
        </EventsSidebarBox>

    );
};

export default EventsSideBar;
