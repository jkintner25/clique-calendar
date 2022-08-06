import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from '../auth/LogoutButton';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import './navbar.css'

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
          <NavLink to='/home' exact={true} activeClassName='active' className={'navlink'}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/newcalendar' exact={true} activeClassName='active' className={'navlink'}>
            Create a Calendar
          </NavLink>
        </li>
        <li>
          <NavLink to='/newevent' exact={true} activeClassName='active' className={'navlink'}>
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