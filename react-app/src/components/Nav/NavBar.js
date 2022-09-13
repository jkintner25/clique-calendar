import React, { useEffect, useState } from 'react';
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
import { getInvites } from '../../store/invites';
import ViewInvites from '../ShareCalendar/ViewInvites';

const NavBarUL = styled.ul`
display: flex;
flex-direction: row;
justify-content: center;
align-items: center;
list-style: none;
text-decoration: none;
height: 100%;
& > li {
  margin: 0;
  display: flex;
  flex-direction: row;
  width: 120px;
  height: 26px;
}
`
const NavLogo = styled.img`
height: 45px;
`
const WelcomeMessage = styled.h2`
font-weight: lighter;
margin-top: 7px;
cursor: default;
`

const Bubble = styled.div`
background-color: #e07a5f;
width: 24px;
height: 24px;
position: relative;
display: flex;
left: -6px;
bottom: 10px;
border: 1px solid black;
border-radius: 14px;
justify-content: center;
align-items: center;
& p {
  cursor: default;
  text-overflow: ellipsis;
  overflow-x: hidden;
  white-space: nowrap;
}
`

const NavBar = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.session.user);
  const invites = useSelector(state => state.invites)
  const [invitesArray, setInvitesArray] = useState([])
  const [createEvent, setCreateEvent] = useState(false);
  const [createCalendar, setCreateCalendar] = useState(false);
  const [loginWindow, setLoginWindow] = useState(false);
  const [signupWindow, setSignupWindow] = useState(false);
  const [invitesWindow, setInvitesWindow] = useState(false);

  useEffect(() => {
    if (!invites) return;
    else {
      let a = Object.values(invites)
      setInvitesArray(a)
    }
  }, [invites])

  useEffect(() => {
    
  }, [])

  useEffect(() => {
    if (!user) return;
    dispatch(getInvites(user.id))
  }, [user])

  function newEventWindow() {
    setCreateEvent(!createEvent)
  };

  function newCalendarWindow() {
    setCreateCalendar(!createCalendar)
  };

  function createLoginWindow() {
    setLoginWindow(!loginWindow)
  };

  function createSignupWindow() {
    setSignupWindow(!signupWindow)
  };

  function viewInvites() {
    setInvitesWindow(!invitesWindow)
  };

  function demoLogIn() {
    dispatch(login("demo@aa.io", "password"));
  };

  if (!user) return (
    <nav className='navbar'>
      <NavLogo src={penguinLogo} />
      <NavBarUL>
        <li>
          <button onClick={() => createLoginWindow()} className={'navlink'}>
            Login
          </button>
        </li>
        <li>
          <button onClick={() => createSignupWindow()} className={'navlink'}>
            Sign Up
          </button>
        </li>
        <li>
          <button onClick={() => demoLogIn()}>
            Demo Login
          </button>
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
      <NavLogo src={penguinLogo} />
      <WelcomeMessage>Welcome, {user.username}!</WelcomeMessage>
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
          <button onClick={() => viewInvites()} className={'navlink'}>
            View Invites
          </button>
          {invitesArray.length ? <Bubble><p>{invitesArray.length}</p></Bubble>
                              : <></>
                            }
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
        {invitesWindow &&
          <Modal onClose={() => setInvitesWindow(false)}>
            <ViewInvites />
          </Modal>
        }
      </NavBarUL>
    </nav>
  );
}

export default NavBar;
