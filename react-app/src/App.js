import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import LoginForm from './components/auth/LoginForm';
import SignUpForm from './components/auth/SignUpForm';
import NavBar from './components/NavBar';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { authenticate } from './store/session';
import CalendarForm from './components/Calendar/CalendarForm';
import SidebarPanel from './components/CalendarsSidebar/SidebarPanel';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path='/calendars' exact={true} >
          <h1>My Calendars</h1>
          <SidebarPanel />
        </ProtectedRoute>
        <ProtectedRoute path='/newcalendar' exact={true}>
          <h1>Create a new Calendar</h1>
          <CalendarForm />
        </ProtectedRoute>
        <ProtectedRoute path='/newevent' exact={true}>
          <h1>Create a new Event</h1>
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
