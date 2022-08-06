import { useSelector } from "react-redux";
import styled from "styled-components";
import Events from "./EventComponent";

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
    const events = Object.values(useSelector(state=>state.events))

    return (
        <EventsSidebarBox>
            <EventsContentBox>
                <Events events={events} />
            </EventsContentBox>
        </EventsSidebarBox>

    );
};

export default EventsSideBar;
