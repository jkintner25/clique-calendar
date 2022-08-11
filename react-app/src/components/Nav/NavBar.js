import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import './navbar.css'
import { Modal } from '../Context/ModalContext';
import EventForm from '../EventSidebar/EventForm';
import CalendarForm from '../Calendar/CalendarForm';

import penguinLogo from '../../images/penguin-logo2.png'
import SignUpForm from '../auth/SignUpForm';
import LoginForm from '../auth/LoginForm';

const NavBarUL = styled.ul`
display: flex;
flex-direction: row;
justify-content: right;
align-items: center;
list-style: none;
text-decoration: none;
height: 100%;
& > li {
  margin: 0 20px;
}
`
const NavLogo = styled.img`
height: 45px;
`

const NavBar = () => {
  const user = useSelector(state => state.session.user)
  const [createEvent, setCreateEvent] = useState(false)
  const [createCalendar, setCreateCalendar] = useState(false)
  const [login, setLogin] = useState(false)
  const [signup, setSignup] = useState(false)

  function newEventWindow() {
    setCreateEvent(!createEvent)
  }

  function newCalendarWindow() {
    setCreateCalendar(!createCalendar)
  }

  function loginWindow() {
    setLogin(!login)
  }

  function signupWindow() {
    setSignup(!signup)
  }

  if (!user) return (
    <nav className='navbar'>
      <NavLogo src={penguinLogo}/>
      <NavBarUL>
        <li>
          <button onClick={()=>loginWindow()} className={'navlink'}>
            Login
          </button>
        </li>
        <li>
          <button onClick={()=>signupWindow()} className={'navlink'}>
            Sign Up
          </button>
        </li>
        <li>
          {/*add demo login button here*/}
        </li>
        {login &&
          <Modal onClose={() => setLogin(false)}>
            <LoginForm setLogin={setLogin} />
          </Modal>
        }
        {signup &&
          <Modal onClose={() => setSignup(false)}>
            <SignUpForm setSignup={setSignup} />
          </Modal>
        }
      </NavBarUL>
    </nav>
  )

  if (user) return (
    <nav className='navbar'>
      <NavLogo src={penguinLogo}/>
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
            <CalendarForm setCreateCalendar={setCreateCalendar} />
          </Modal>
        }
      </NavBarUL>
    </nav>
  );
}

export default NavBar;
