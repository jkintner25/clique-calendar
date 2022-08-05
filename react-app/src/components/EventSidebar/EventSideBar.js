import styled from "styled-components";

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


    return (
        <EventsSidebarBox>
            <EventsContentBox>

            </EventsContentBox>
        </EventsSidebarBox>

    );
};

export default EventsSideBar;
