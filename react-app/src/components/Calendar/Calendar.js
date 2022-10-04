import moment from 'moment';
import { useEffect, useState } from 'react';
import './calendar.css'
import buildCalendar from './build';
import previousImg from '../../images/fast-backward.png'
import nextImg from '../../images/fast-forward.png'
import { useDispatch, useSelector } from 'react-redux';
import { selectEvent } from '../../store/selectedEvent';
import {
    convertDatesToLocal,
    dayEventChecker,
    dayStyles,
    currentMonthName,
    currentYear,
    previousMonth,
    nextMonth,
    dayNames
} from './utilities';

import {
    CalButton,
    CalendarContainer,
    WeekContainer,
    DayContainer
} from './styled'

function Calendar() {
    const dispatch = useDispatch()
    const [calendar, setCalendar] = useState([])
    const [value, setValue] = useState(moment())
    const eventsState = useSelector(state => state.events)
    const [newEvents, setNewEvents] = useState(null)

    useEffect(() => {
        setCalendar(buildCalendar(value))
    }, [value]);

    useEffect(() => {
        if (!eventsState) return;
        setNewEvents(() => convertDatesToLocal(eventsState))
    }, [eventsState]);

    const showEventDetails = (event) => {
        dispatch(selectEvent(event))
    };

    return (
        <CalendarContainer>
            <div className='calendar-header'>
                <div className='previous' onClick={() => setValue(previousMonth(value))}><CalButton src={previousImg} /></div>
                <div className='current'>{currentMonthName(value)} {currentYear(value)}</div>
                <div className='next' onClick={() => setValue(nextMonth(value))}><CalButton src={nextImg} /></div>
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
                                    {newEvents && dayEventChecker(newEvents, day).map(event => {
                                        return <p className='event' key={event.id} onClick={() => showEventDetails(event)}>{event.title}</p>
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
