import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { cleanCalendars } from '../../store/calendars';
import { cleanEvents } from '../../store/events';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout())
    dispatch(cleanCalendars())
    dispatch(cleanEvents())
    return history.push('/')
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
