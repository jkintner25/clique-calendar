import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import './navbar.css'
import { Modal } from '../Context/ModalContext';
import EventForm from '../EventSidebar/EventForm';
import CalendarForm from '../Calendar/CalendarForm';
import { login } from '../../store/session'
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
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user)
  const [createEvent, setCreateEvent] = useState(false)
  const [createCalendar, setCreateCalendar] = useState(false)
  const [loginWindow, setLoginWindow] = useState(false)
  const [signupWindow, setSignupWindow] = useState(false)

  function newEventWindow() {
    setCreateEvent(!createEvent)
  }

  function newCalendarWindow() {
    setCreateCalendar(!createCalendar)
  }

  function createLoginWindow() {
    setLoginWindow(!loginWindow)
  }

  function createSignupWindow() {
    setSignupWindow(!signupWindow)
  }

  function demoLogIn() {
    dispatch(login("demo@aa.io", "password"));
  };

  if (!user) return (
    <nav className='navbar'>
      <NavLogo src={penguinLogo}/>
      <NavBarUL>
        <li>
          <button onClick={()=>createLoginWindow()} className={'navlink'}>
            Login
          </button>
        </li>
        <li>
          <button onClick={()=>createSignupWindow()} className={'navlink'}>
            Sign Up
          </button>
        </li>
        <li>
          <button onClick={()=>demoLogIn()}>
            Demo Login
          </button>
        </li>
        <li>
          {/*add demo login button here*/}
        </li>
        {loginWindow &&
          <Modal onClose={() => setLoginWindow(false)}>
            <LoginForm setLoginWindow={setLoginWindow} />
          </Modal>
        }
        {signupWindow &&
          <Modal onClose={() => setSignupWindow(false)}>
            <SignUpForm setSignupWindow={setSignupWindow} />
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
