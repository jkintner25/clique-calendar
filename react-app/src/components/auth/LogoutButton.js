import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { cleanCalendars } from '../../store/calendars';
import { cleanEvents } from '../../store/events';
import { logout } from '../../store/session';

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout())
    dispatch(cleanCalendars())
    dispatch(cleanEvents())
    return <Redirect to={'/'} />
  };

  return <button onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
