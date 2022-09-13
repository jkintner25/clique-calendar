import { useState } from 'react';
import styled from 'styled-components';
import './rooms.css'

const CalendarTitle = styled.h3`
position: relative;
width: 150px;
height: 28px;
padding-top: 2px;
padding-left: 2px;
border: 1px solid black;
cursor: pointer;
font-weight: lighter;
`

function Room({calendarId, selected, calendarTitle, joinRoom}) {

    function style() {
        if (selected === calendarId) return 'selected';
        else return '';
    };

    return (
        <CalendarTitle
        className={style()}
        onClick={()=>joinRoom(calendarTitle, calendarId)}
        >{calendarTitle}</CalendarTitle>
    );
};

export default Room;
