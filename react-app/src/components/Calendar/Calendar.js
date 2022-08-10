import moment from 'moment';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import './calendar.css'
import buildCalendar from './build';
import previousImg from '../../images/fast-backward.png'
import nextImg from '../../images/fast-forward.png'
import { useSelector } from 'react-redux';
import { useSetEvent } from '../Context/EventContext';

const CalButton = styled.img`
width: 40px;
height: 40px;
`

const CalendarContainer = styled.div`
position: relative;
width: 62%;
min-width: fit-content;
max-width: 700px;
height: fit-content;
display: inline-block;
padding: 0;
margin: 0;
z-index: 1;
text-align: center;
`

const WeekContainer = styled.div`
height: 100px;
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
overflow-y: auto;
`

function Calendar() {
    const setActiveEvent = useSetEvent()
    const [calendar, setCalendar] = useState([])
    const [value, setValue] = useState(moment())
    const eventsState = useSelector(state => state.events)
    const events = Object.values(eventsState)
    const [newEvents, setNewEvents] = useState(null)

    const convertDatesToLocal = (events) => {
        const list = events.map(event => {
            return {...event,
                    startDate: new Date(event.startDate).toLocaleString('en-US', { 'hour12': true }),
                    endDate: new Date(event.endDate).toLocaleString('en-US', { 'hour12': true })};
        })
        setNewEvents(list)
    };

    useEffect(()=>{
        if(!eventsState)return;
        convertDatesToLocal(events)
    }, [eventsState]);

    function dayEventChecker(day) {
        return newEvents.filter(event=>{
            return moment(event.startDate, "M-D-YYYY").isSame(moment(day, "M-D-YYYY")) ||
            moment(event.endDate, "M-D-YYYY").isSame(moment(day, "M-D-YYYY")) ||
            (moment(event.startDate, "M-D-YYYY").isBefore(moment(day, "M-D-YYYY")) &&
            moment(event.endDate, "M-D-YYYY").isAfter(moment(day, "M-D-YYYY")))
        });
    };

    useEffect(() => {
        setCalendar(buildCalendar(value))
    }, [value]);

    function isSelected(day, value) {
        return value.isSame(day, 'day')
    };

    function beforeToday(day) {
        return day.isBefore(new Date(), 'day')
    };

    function isToday(day) {
        return day.isSame(new Date(), 'day')
    };

    function dayStyles(day, value) {
        if (isSelected(day, value)) return 'selected day'
        if (beforeToday(day)) return 'before day'
        if (isToday(day)) return 'today day'
        return 'day'
    };

    function currentMonthName() {
        return value.format('MMMM')
    };

    function currentYear() {
        return value.format('YYYY')
    };

    function previousMonth() {
        return value.clone().subtract(1, 'month')
    };

    function nextMonth() {
        return value.clone().add(1, 'month')
    };

    function showEventDetails(event) {
        setActiveEvent(event);
    };

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <CalendarContainer>
            <div className='calendar-header'>
                <div className='previous' onClick={() => setValue(previousMonth())}><CalButton src={previousImg} /></div>
                <div className='current'>{currentMonthName()} {currentYear()}</div>
                <div className='next' onClick={() => setValue(nextMonth())}><CalButton src={nextImg} /></div>
            </div>
            <div className='dayNames'>
                {
                    dayNames.map((dayName, i = 0) => {
                        i++
                        return <p key={i}>{dayName}</p>
                    })
                }
            </div>
            <div className='body'>
                {newEvents && calendar.map((week, i = 0) => {
                    i++
                    return <WeekContainer key={i}>
                        {week.map((day, i = 0) => {
                            i++
                            return <DayContainer key={i} onClick={() => setValue(day)}>
                                    <div className={dayStyles(day, value)}>{day.format('D').toString()}
                                    {newEvents && dayEventChecker(day).map(event=>{
                                        return <p className='event' key={event.id} onClick={()=>showEventDetails(event)}>{event.title}</p>
                                    })}
                                    </div>
                            </DayContainer>
                        })}
                    </WeekContainer>
                })}
            </div>
        </CalendarContainer>
    )
};

export default Calendar;
