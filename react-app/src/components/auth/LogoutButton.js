import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, useHistory } from 'react-router-dom';
import { cleanCalendars } from '../../store/calendars';
import { cleanEvents } from '../../store/events';
import { clearMessages } from '../../store/messages';
import { clearEvent } from '../../store/selectedEvent';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout())
    dispatch(cleanCalendars())
    dispatch(cleanEvents())
    dispatch(clearEvent())
    dispatch(clearMessages())
    return history.push('/')
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
