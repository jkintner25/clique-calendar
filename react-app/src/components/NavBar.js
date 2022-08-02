import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

const NavBarUL = styled.ul`
display: flex;
flex-direction: row;
justify-content: space-around;
list-style: none;
text-decoration: none;
`

const NavBar = () => {
  const user = useSelector(state=>state.session.user)

  if (!user) return (
    <nav>
      <NavBarUL>
        <li>
          <NavLink to='/login' exact={true} activeClassName='active'>
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to='/sign-up' exact={true} activeClassName='active'>
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to='/'>
            Demo
          </NavLink>
        </li>
      </NavBarUL>
    </nav>
  )

  if (user) return (
    <nav>
      <NavBarUL>
        <li>
          <NavLink to='/calendars' exact={true} activeClassName='active'>
            My Calendars
          </NavLink>
        </li>
        <li>
          <NavLink to='/newcalendar' exact={true} activeClassName='active'>
            Create a Calendar
          </NavLink>
        </li>
        <li>
          <NavLink to='/newevent' exact={true} activeClassName='active'>
            Create an Event
          </NavLink>
        </li>
        <li>
          <LogoutButton />
        </li>
      </NavBarUL>
    </nav>
  );
}

export default NavBar;
