import moment from 'moment';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import './calendar.css'
import buildCalendar from './build';
import previousImg from '../../images/fast-backward.png'
import nextImg from '../../images/fast-forward.png'
import { useCalendar } from '../Context/CalendarContext';

const CalButton = styled.img`
width: 40px;
height: 40px;
`

const CalendarContainer = styled.div`
position: relative;
width: 50vw;
min-width: fit-content;
height: fit-content;
display: inline-block;
padding: 0;
margin: 0;
z-index: 1;
text-align: center;
`

const DayContainer = styled.div`
display: inline-block;
position: relative;
width: calc(100% / 7);
height: 100px;
padding: 0;
margin: 0;
box-sizing: border-box;
z-index: 2;
text-align: left;
background-color: #F4F1DE;
border: solid 1px #F4F1DE;
color: #3d405b;
transition-duration: 400ms;
&:hover {
    background-color: #f38d71;
  }
`

function Calendar() {
    const [calendar, setCalendar] = useState([])
    const [value, setValue] = useState(moment())
    const activeCalendar = useCalendar()

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
        if (isSelected(day, value)) return 'selected'
        if (beforeToday(day)) return 'before'
        if (isToday(day)) return 'today'
        return ''
    }

    function currentMonthName() {
        return value.format('MMMM')
    }

    function currentYear() {
        return value.format('YYYY')
    }

    function previousMonth() {
        return value.clone().subtract(1, 'month')
    }

    function nextMonth() {
        return value.clone().add(1, 'month')
    }

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    return (
        <CalendarContainer>
            <div className='calendar-header'>
                <div className='previous' onClick={()=>setValue(previousMonth())}><CalButton src={previousImg}/></div>
                <div className='current'>{currentMonthName()} {currentYear()}</div>
                <div className='next' onClick={()=>setValue(nextMonth())}><CalButton src={nextImg} /></div>
            </div>
            <div className='dayNames'>
                {
                    dayNames.map((dayName, i=0) => {
                        i++
                        return <p key={i}>{dayName}</p>
                    })
                }
            </div>
            <div className='body'>
                {calendar.map((week, i = 0) => {
                    i++
                    return <div key={i}>
                        {week.map((day, i = 0) => {
                            i++
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
