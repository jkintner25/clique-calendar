import React, { useState } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import './navbar.css'
import { Modal } from '../Context/ModalContext';
import EventForm from '../EventSidebar/EventForm';
import CalendarForm from '../Calendar/CalendarForm';

const NavBarUL = styled.ul`
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
list-style: none;
text-decoration: none;
height: 100%;
`


const NavBar = () => {
  const user = useSelector(state => state.session.user)
  const [createEvent, setCreateEvent] = useState(false)
  const [createCalendar, setCreateCalendar] = useState(false)

  function newEventWindow() {
    setCreateEvent(!createEvent)
  }

  function newCalendarWindow() {
    setCreateCalendar(!createCalendar)
  }

  if (!user) return (
    <nav className='navbar'>
      <NavBarUL>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active' className={'navlink'}>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active' className={'navlink'}>
            Sign Up
          </NavLink>
        </li>
        <li>
          {/*add demo login button here*/}
        </li>
      </NavBarUL>
    </nav>
  )

  if (user) return (
    <nav className='navbar'>
      <NavBarUL>
        <li>
          <button onClick={() => newCalendarWindow()} className={'navlink'}>
            Create a Calendar
          </button>
        </li>
        <li>
          <button onClick={() => newEventWindow()} className={'navlink'}>
            Create an Event
          </button>
        </li>
        <li>
          <LogoutButton />
        </li>
        {createEvent &&
          <Modal onClose={() => setCreateEvent(false)}>
            <EventForm setCreateEvent={setCreateEvent} />
          </Modal>
        }
        {createCalendar &&
          <Modal onClose={() => setCreateCalendar(false)}>
            <CalendarForm />
          </Modal>
        }
      </NavBarUL>
    </nav>
  );
}

export default NavBar;
