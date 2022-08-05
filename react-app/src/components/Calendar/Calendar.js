import moment from 'moment';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import './calendar.css'
import buildCalendar from './build';

const CalendarContainer = styled.div`
position: relative;
width: 760px;
height: fit-content;
display: inline-block;
padding: 0;
margin: 0;
box-sizing: border-box;
z-index: 1;
text-align: center;
`

const DayContainer = styled.div`
position: relative;
width: calc(100% / 7);
height: 119.7px;
display: inline-block;
background-color: white;
padding: 0;
margin: 0;
box-sizing: border-box;
z-index: 2;
text-align: left;
background-color: #F4F1DE;
color: #3d405b;
`

function Calendar() {
    const [calendar, setCalendar] = useState([])
    const [value, setValue] = useState(moment())

    useEffect(() => {
        setCalendar(buildCalendar(value))
    }, [value])

    function isSelected(day, value) {
        return value.isSame(day, 'day')
    }

    function beforeToday(day) {
        return day.isBefore(new Date(), 'day')
    }

    function isToday(day) {
        return day.isSame(new Date(), 'day')
    }

    function dayStyles(day, value) {
        if (beforeToday(day)) return 'before'
        if (isSelected(day, value)) return 'selected'
        if (isToday(day)) return 'today'
        return ''
    }

    function currentMonthName() {
        return value.format('MMMM')
    }

    function currentYear() {
        return value.format('YYYY')
    }

    return (
        <CalendarContainer>
            <div className='calendar-header'>
                <div></div>
                <div>{currentMonthName()} {currentYear()}</div>
                <div></div>
            </div>
            <div className='body'>
                {calendar.map((week, i = 0) => {
                    return <div key={i}>
                        {week.map((day, i = 0) => {
                            return <DayContainer key={i} onClick={() => setValue(day)}>
                                <div className={dayStyles(day, value)}>{day.format('D').toString()}</div>
                            </DayContainer>
                        })}
                    </div>
                })}
            </div>
        </CalendarContainer>
    )
};

export default Calendar;
