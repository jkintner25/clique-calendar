import styled from 'styled-components';

const CalendarTitle = styled.li`
width: 100%;
height: auto;
border: 1px solid black;
cursor: pointer;
`

function Room({calendarId, calendarTitle, joinRoom}) {

    return (
        <CalendarTitle
        onClick={()=>joinRoom(calendarTitle, calendarId)}
        >{calendarTitle}</CalendarTitle>
    );
};

export default Room;
